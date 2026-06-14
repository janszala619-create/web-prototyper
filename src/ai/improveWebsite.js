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
    return "Heute starten";
  }

  if (goal === "Improve conversion") {
    return "Jetzt starten";
  }

  if (goal === "Make it more premium") {
    return "Persoenliche Beratung anfragen";
  }

  return "Loslegen";
}

function improveLineCard(element, goal, index) {
  const { title, body } = splitLines(element.text);
  const baseTitle = title || `Vorteil ${index + 1}`;
  const baseBody = body || "Klarer Nutzen fuer Besucher, die einen sicheren naechsten Schritt brauchen.";

  if (goal === "Shorten text") {
    return textWithStyle(element, `${shorten(baseTitle, 34)}\n${shorten(baseBody, 96)}`);
  }

  if (goal === "Make it more premium") {
    return textWithStyle(
      element,
      `${baseTitle.replace(/^AI /, "")}\nEin hochwertiges Erlebnis fuer Kunden, die Klarheit, Qualitaet und praezise Umsetzung schaetzen.`
    );
  }

  if (goal === "Improve conversion") {
    return textWithStyle(
      element,
      `${baseTitle}\nEin klarer Nutzen, weniger Zweifel und ein staerkerer Grund fuer den naechsten Schritt.`
    );
  }

  return textWithStyle(
    element,
    `${baseTitle}\n${shorten(baseBody, 130)} Klar, nuetzlich und leicht verstaendlich.`
  );
}

function improveQuote(element, goal, index) {
  const names = ["Maya Chen", "Jonas Weber", "Amara Brooks"];
  const roles = ["Gruenderin", "Operations Lead", "Kunde"];

  if (goal === "Shorten text") {
    return textWithStyle(element, `"Klar, schnell und leicht umzusetzen."\n- ${names[index] ?? "Kunde"}, ${roles[index] ?? "Kunde"}`);
  }

  return textWithStyle(
    element,
    `"Die Seite machte den Nutzen sofort sichtbar und gab uns Sicherheit fuer den naechsten Schritt."\n- ${names[index] ?? "Kunde"}, ${roles[index] ?? "Kunde"}`
  );
}

function improveFaq(element, goal, index) {
  const faqs = [
    ["Fuer wen ist das gedacht?", "Es ist fuer Besucher gemacht, die ein klares Angebot, starke Beweise und einen einfachen naechsten Schritt brauchen."],
    ["Wie schnell kann ich starten?", "Der erste Schritt ist einfach: Waehle die Aktion auf dieser Seite und folge dem klaren Weg."],
    ["Was macht das anders?", "Die Botschaft konzentriert sich auf praktische Ergebnisse statt auf vage Versprechen."],
    ["Kann diese Seite spaeter geaendert werden?", "Ja, jede Section bleibt im Builder editierbar."]
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
            : `${section.content.title.text.replace(/[.!?]+$/, "")}, klarer formuliert`,
          {
            color: goal === "Make it more premium" ? "#fffaf3" : tonePreset.text,
            fontSize: tonePreset.heroFontSize
          }
        ),
        text: textWithStyle(
          section.content.text,
          goal === "Shorten text"
            ? shorten(section.content.text.text, 120)
            : "Eine schaerfere Botschaft, klarere Beweise und ein staerkerer Weg von Interesse zu Handlung.",
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
        title: textWithStyle(section.content.title, "Beweise, die die Entscheidung leichter machen", {
          color: tonePreset.text
        }),
        quotes: section.content.quotes.map((quote, index) => improveQuote(quote, goal, index))
      });
    case "Pricing":
      return sectionWithStyle(section, sectionStyles, {
        title: textWithStyle(section.content.title, "Einfache Optionen fuer den naechsten Schritt"),
        plans: section.content.plans.map((plan, index) => improveLineCard(plan, goal, index))
      });
    case "FAQ":
      return sectionWithStyle(section, sectionStyles, {
        title: textWithStyle(section.content.title, "Fragen klar beantwortet"),
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
          title: textWithStyle(section.content.title, "Bereit fuer einen klareren naechsten Schritt?", {
            color: "#ffffff"
          }),
          text: textWithStyle(section.content.text, "Verwandle Interesse in Handlung mit einer Botschaft, der man leichter vertraut.", {
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
  const fallbackWebsite = improveWebsite(input);

  return requestImprovedWebsite(input)
    .then((aiWebsite) => {
      const normalizedWebsite = normalizeImprovedWebsite(
        aiWebsite,
        Array.isArray(input?.sections) ? input.sections : []
      );

      return {
        ...normalizedWebsite,
        designSystemSuggestions: {
          ...fallbackWebsite.designSystemSuggestions,
          ...normalizedWebsite.designSystemSuggestions
        }
      };
    })
    .catch(() => ({
      ...fallbackWebsite,
      designSystemSuggestions: {
        ...fallbackWebsite.designSystemSuggestions,
        aiFallbackUsed: true
      }
    }));
}
