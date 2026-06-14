import OpenAI from "openai";

const MAX_FIELD_LENGTH = 1000;
const MAX_SECTIONS = 12;
const MAX_SECTION_JSON_LENGTH = 70000;
const allowedGoals = [
  "Make more professional",
  "Make more modern",
  "Improve conversion",
  "Shorten text",
  "Make copy clearer",
  "Make it more premium",
  "Improve CTA"
];
const allowedTones = ["Modern", "Professional", "Friendly", "Luxury", "Startup"];

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
    throw new Error("Leere KI-Antwort.");
  }

  try {
    return JSON.parse(trimmedText);
  } catch {
    const jsonStart = trimmedText.indexOf("{");
    const jsonEnd = trimmedText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      throw new Error("KI-Antwort enthielt kein JSON.");
    }

    return JSON.parse(trimmedText.slice(jsonStart, jsonEnd + 1));
  }
}

function validateSections(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const sections = value.slice(0, MAX_SECTIONS);
  const serialized = JSON.stringify(sections);

  if (serialized.length > MAX_SECTION_JSON_LENGTH) {
    throw new Error("Sections-Payload ist zu gross.");
  }

  return sections;
}

function validateInput(body) {
  return {
    sections: validateSections(body.sections),
    improvementGoal: cleanOption(body.improvementGoal, allowedGoals, "Make copy clearer"),
    tone: cleanOption(body.tone, allowedTones, "Modern"),
    additionalInstructions: cleanString(body.additionalInstructions, "", 1200)
  };
}

function validateOutput(value) {
  if (!value || typeof value !== "object") {
    throw new Error("KI-Antwort war kein Objekt.");
  }

  if (!Array.isArray(value.sections) || value.sections.length === 0) {
    throw new Error("KI-Antwort enthielt keine Sections.");
  }

  return {
    sections: value.sections,
    designSystemSuggestions:
      value.designSystemSuggestions && typeof value.designSystemSuggestions === "object"
        ? value.designSystemSuggestions
        : {}
  };
}

function getSafeOpenAiError(error) {
  if (error?.status === 401) {
    return "OpenAI API-Key ist ungueltig oder hat keinen Zugriff.";
  }

  if (error?.status === 429) {
    return "OpenAI Rate Limit oder Kontingent erreicht.";
  }

  if (error?.status === 400) {
    return "OpenAI hat das Anfrageformat abgelehnt.";
  }

  return "Website konnte nicht verbessert werden.";
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Methode nicht erlaubt. Bitte POST verwenden." });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(response, 500, { error: "OpenAI API-Key ist nicht konfiguriert." });
    return;
  }

  try {
    const input = validateInput(request.body ?? {});

    if (input.sections.length === 0) {
      sendJson(response, 400, { error: "Mindestens eine Section ist erforderlich." });
      return;
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "Antworte ausschließlich mit validem JSON. Kein Markdown. Keine Erklärtexte. Nutze exakt die erwartete Struktur. Keine Scripts. Keine externen Tracking-Codes. Sections müssen mit dem bestehenden Editor kompatibel sein. Erhalte IDs und Section-Reihenfolge möglichst unverändert. Wenn du styles setzt, dann nur color/backgroundColor als Hex-Farben und padding/margin/borderRadius/fontSize als Zahlen. Keine CSS-Shorthands wie '80px 24px'."
        },
        {
          role: "user",
          content: `Verbessere die Website-Sections und gib JSON mit exakt diesen Top-Level-Keys zurück: sections, designSystemSuggestions. Ändere möglichst nur Texte und Styles, nicht IDs oder Reihenfolge. Input: ${JSON.stringify(input)}`
        }
      ],
      max_output_tokens: 4500
    });
    const jsonText = extractJsonText(result);

    try {
      const parsed = validateOutput(parseJsonResponse(jsonText));

      sendJson(response, 200, parsed);
    } catch {
      sendJson(response, 502, { error: "OpenAI hat kein gueltiges JSON geliefert." });
    }
  } catch (error) {
    const message =
      error.message === "Sections-Payload ist zu gross."
        ? "Sections-Payload ist zu gross."
        : getSafeOpenAiError(error);

    sendJson(response, 500, { error: message });
  }
}
