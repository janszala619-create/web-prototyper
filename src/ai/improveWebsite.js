import { improveWebsiteWithAI as requestImprovedWebsite } from "./aiClient.js";
import { normalizeImprovedWebsite } from "./sectionNormalizer.js";
import { getTonePreset, toneOptions } from "./tonePresets.js";

export const improvementGoalOptions = [
  "Make more professional",
  "Make more modern",
  "Improve conversion",
  "Shorten text",
  "Make copy clearer",
  "Make it more premium",
  "Improve CTA"
];

function cleanValue(value, fallback) {
  const trimmed = String(value ?? "").trim();

  return trimmed || fallback;
}

function normalizeOption(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function splitLines(text) {
  const [title, ...body] = String(text ?? "").split("\n");

  return {
    title: title.trim(),
    body: body.join("\n").trim()
  };
}

function shorten(value, maxLength = 150) {
  const text = String(value ?? "").trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function textWithStyle(element, text, styles = {}) {
  return {
    ...element,
    text,
    styles: {
      ...element.styles,
      ...styles
    }
  };
}

function sectionWithStyle(section, styles = {}, content = {}) {
  return {
    ...section,
    styles: {
      ...section.styles,
      ...styles
    },
    content: {
      ...section.content,
      ...content
    }
  };
}

function getPrimaryAction(goal) {
  if (goal === "Improve CTA") {
    return "Get Started Today";
  }

  if (goal === "Improve conversion") {
    return "Start Now";
  }

  if (goal === "Make it more premium") {
    return "Request a Private Consultation";
  }

  return "Get Started";
}

function improveLineCard(element, goal, index) {
  const { title, body } = splitLines(element.text);
  const baseTitle = title || `Benefit ${index + 1}`;
  const baseBody = body || "Clear value for visitors who need a confident next step.";

  if (goal === "Shorten text") {
    return textWithStyle(element, `${shorten(baseTitle, 34)}\n${shorten(baseBody, 96)}`);
  }

  if (goal === "Make it more premium") {
    return textWithStyle(
      element,
      `${baseTitle.replace(/^AI /, "")}\nA refined experience built for clients who value clarity, quality and expert execution.`
    );
  }

  if (goal === "Improve conversion") {
    return textWithStyle(
      element,
      `${baseTitle}\nA clear benefit, fewer doubts and a stronger reason to take the next step.`
    );
  }

  return textWithStyle(
    element,
    `${baseTitle}\n${shorten(baseBody, 130)} Clear, useful and easy to understand.`
  );
}

function improveQuote(element, goal, index) {
  const names = ["Maya Chen", "Jonas Weber", "Amara Brooks"];
  const roles = ["Founder", "Operations Lead", "Customer"];

  if (goal === "Shorten text") {
    return textWithStyle(element, `"Clear, fast and easy to act on."\n- ${names[index] ?? "Customer"}, ${roles[index] ?? "Customer"}`);
  }

  return textWithStyle(
    element,
    `"The page made the value obvious and gave us confidence to take the next step."\n- ${names[index] ?? "Customer"}, ${roles[index] ?? "Customer"}`
  );
}

function improveFaq(element, goal, index) {
  const faqs = [
    ["Who is this for?", "It is built for visitors who need a clear offer, strong proof and an easy next step."],
    ["How quickly can I start?", "The first step is simple: choose the action on this page and follow the guided path."],
    ["What makes this different?", "The message is focused on practical outcomes instead of vague promises."],
    ["Can this page change later?", "Yes, every section remains editable in the builder."]
  ];
  const [question, answer] = faqs[index % faqs.length];

  if (goal === "Shorten text") {
    return textWithStyle(element, `${question}\n${shorten(answer, 90)}`);
  }

  return textWithStyle(element, `${question}\n${answer}`);
}

function improveSection(section, options, tonePreset) {
  const goal = options.improvementGoal;
  const action = getPrimaryAction(goal);
  const sectionStyles = {
    backgroundColor:
      goal === "Make it more premium" && section.type === "Hero"
        ? tonePreset.hero
        : section.styles.backgroundColor,
    padding: Math.max(Number(section.styles.padding) || 0, tonePreset.sectionPadding - 10)
  };

  switch (section.type) {
    case "Hero":
      return sectionWithStyle(section, sectionStyles, {
        title: textWithStyle(
          section.content.title,
          goal === "Shorten text"
            ? shorten(section.content.title.text, 58)
            : `${section.content.title.text.replace(/[.!?]+$/, "")}, made clearer`,
          {
            color: goal === "Make it more premium" ? "#fffaf3" : tonePreset.text,
            fontSize: tonePreset.heroFontSize
          }
        ),
        text: textWithStyle(
          section.content.text,
          goal === "Shorten text"
            ? shorten(section.content.text.text, 120)
            : "A sharper message, clearer proof and a stronger path from interest to action.",
          {
            color: goal === "Make it more premium" ? "#d8c7a1" : tonePreset.softText,
            fontSize: 19
          }
        ),
        button: textWithStyle(section.content.button, action, {
          backgroundColor: tonePreset.primary,
          borderRadius: tonePreset.buttonRadius,
          color: goal === "Make it more premium" ? "#111111" : "#ffffff"
        })
      });
    case "Features":
      return sectionWithStyle(section, sectionStyles, {
        cards: section.content.cards.map((card, index) => improveLineCard(card, goal, index))
      });
    case "Testimonials":
      return sectionWithStyle(section, sectionStyles, {
        title: textWithStyle(section.content.title, "Proof that makes the decision easier", {
          color: tonePreset.text
        }),
        quotes: section.content.quotes.map((quote, index) => improveQuote(quote, goal, index))
      });
    case "Pricing":
      return sectionWithStyle(section, sectionStyles, {
        title: textWithStyle(section.content.title, "Simple options for the next step"),
        plans: section.content.plans.map((plan, index) => improveLineCard(plan, goal, index))
      });
    case "FAQ":
      return sectionWithStyle(section, sectionStyles, {
        title: textWithStyle(section.content.title, "Questions answered clearly"),
        items: section.content.items.map((item, index) => improveFaq(item, goal, index))
      });
    case "CTA":
      return sectionWithStyle(
        section,
        {
          backgroundColor: tonePreset.dark,
          padding: tonePreset.sectionPadding
        },
        {
          title: textWithStyle(section.content.title, "Ready for a clearer next step?", {
            color: "#ffffff"
          }),
          text: textWithStyle(section.content.text, "Turn interest into action with a message that is easier to trust.", {
            color: "#dbe3ee"
          }),
          button: textWithStyle(section.content.button, action, {
            backgroundColor: tonePreset.primary,
            borderRadius: tonePreset.buttonRadius,
            color: goal === "Make it more premium" ? "#111111" : "#ffffff"
          })
        }
      );
    case "Footer":
      return sectionWithStyle(section, {
        backgroundColor: tonePreset.dark
      });
    default:
      return section;
  }
}

export function improveWebsite(input = {}) {
  const sections = Array.isArray(input.sections) ? clone(input.sections) : [];
  const improvementGoal = normalizeOption(
    input.improvementGoal,
    improvementGoalOptions,
    "Make copy clearer"
  );
  const tone = normalizeOption(input.tone, toneOptions, "Modern");
  const additionalInstructions = cleanValue(input.additionalInstructions, "");
  const tonePreset = getTonePreset(tone);

  return {
    sections: sections.map((section) =>
      improveSection(section, { improvementGoal, additionalInstructions }, tonePreset)
    ),
    designSystemSuggestions: {
      tone,
      improvementGoal,
      additionalInstructions,
      colors: {
        primary: tonePreset.primary,
        hero: tonePreset.hero,
        dark: tonePreset.dark,
        text: tonePreset.text
      },
      buttons: {
        borderRadius: tonePreset.buttonRadius,
        suggestedCta: getPrimaryAction(improvementGoal)
      }
    }
  };
}

export function improveWebsiteWithAI(input) {
  // Server-side OpenAI call lives in /api/improve-website.
  // Never pass or store an API key in the Vite frontend.
  return requestImprovedWebsite(input).then((aiWebsite) =>
    normalizeImprovedWebsite(aiWebsite, Array.isArray(input?.sections) ? input.sections : [])
  );
}
