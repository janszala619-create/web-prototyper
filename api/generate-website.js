import OpenAI from "openai";

const MAX_FIELD_LENGTH = 800;
const allowedIndustries = ["SaaS", "Agency", "E-Commerce", "Portfolio", "Restaurant", "Other"];
const allowedTones = ["Modern", "Professional", "Friendly", "Luxury", "Startup"];
const allowedGoals = ["Get leads", "Sell product", "Book appointments", "Build trust", "Showcase work"];

function sendJson(response, status, body) {
  response.status(status).setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

function cleanString(value, fallback, maxLength = MAX_FIELD_LENGTH) {
  const trimmed = String(value ?? "").trim();

  return (trimmed || fallback).slice(0, maxLength);
}

function cleanOption(value, allowedValues, fallback) {
  return allowedValues.includes(value) ? value : fallback;
}

function extractJsonText(result) {
  if (typeof result.output_text === "string" && result.output_text.trim()) {
    return result.output_text;
  }

  const textParts = [];

  for (const outputItem of result.output ?? []) {
    for (const contentItem of outputItem.content ?? []) {
      if (contentItem.type === "output_text" && contentItem.text) {
        textParts.push(contentItem.text);
      }
    }
  }

  return textParts.join("\n");
}

function parseJsonResponse(text) {
  const trimmedText = String(text ?? "").trim();

  if (!trimmedText) {
    throw new Error("Empty AI response.");
  }

  try {
    return JSON.parse(trimmedText);
  } catch {
    const jsonStart = trimmedText.indexOf("{");
    const jsonEnd = trimmedText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      throw new Error("AI response did not contain JSON.");
    }

    return JSON.parse(trimmedText.slice(jsonStart, jsonEnd + 1));
  }
}

function validateInput(body) {
  return {
    businessName: cleanString(body.businessName, "Northstar", 120),
    industry: cleanOption(body.industry, allowedIndustries, "Other"),
    audience: cleanString(body.audience, "Customers", 160),
    description: cleanString(body.description, "a focused product or service"),
    tone: cleanOption(body.tone, allowedTones, "Modern"),
    mainGoal: cleanOption(body.mainGoal, allowedGoals, "Get leads")
  };
}

function validateOutput(value) {
  if (!value || typeof value !== "object") {
    throw new Error("AI response was not an object.");
  }

  if (!Array.isArray(value.sections) || value.sections.length === 0) {
    throw new Error("AI response did not include sections.");
  }

  return {
    template: typeof value.template === "string" ? value.template : "saas",
    designSystem:
      value.designSystem && typeof value.designSystem === "object" ? value.designSystem : {},
    sections: value.sections
  };
}

function getSafeOpenAiError(error) {
  if (error?.status === 401) {
    return "OpenAI API key is invalid or missing access.";
  }

  if (error?.status === 429) {
    return "OpenAI rate limit or quota reached.";
  }

  if (error?.status === 400) {
    return "OpenAI rejected the request format.";
  }

  return "Could not generate website.";
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed. Use POST." });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(response, 500, { error: "OpenAI API key is not configured." });
    return;
  }

  try {
    const input = validateInput(request.body ?? {});
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "Antworte ausschließlich mit validem JSON. Kein Markdown. Keine Erklärtexte. Nutze exakt die erwartete Struktur. Keine Scripts. Keine externen Tracking-Codes. Sections müssen mit dem bestehenden Editor kompatibel sein."
        },
        {
          role: "user",
          content: `Erzeuge eine Website als JSON mit exakt diesen Top-Level-Keys: template, designSystem, sections. Nutze normale Editor-kompatible Section-Objekte mit id, type, label, tag, text, styles und content. Erzeuge Hero, Features, Testimonials, Pricing, FAQ, CTA und Footer. Input: ${JSON.stringify(input)}`
        }
      ],
      max_output_tokens: 3500
    });
    const jsonText = extractJsonText(result);

    try {
      const parsed = validateOutput(parseJsonResponse(jsonText));

      sendJson(response, 200, parsed);
    } catch {
      sendJson(response, 502, { error: "OpenAI returned invalid JSON." });
    }
  } catch (error) {
    sendJson(response, 500, { error: getSafeOpenAiError(error) });
  }
}
