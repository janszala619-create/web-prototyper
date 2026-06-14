import { createSection } from "../data/initialElements.js";

function cleanValue(value, fallback) {
  const trimmedValue = String(value ?? "").trim();

  return trimmedValue || fallback;
}

function updateTextElement(element, text) {
  return {
    ...element,
    text
  };
}

function applySectionContent(section, contentUpdates) {
  return {
    ...section,
    content: {
      ...section.content,
      ...contentUpdates
    }
  };
}

function applySectionStyles(section, styleUpdates) {
  return {
    ...section,
    styles: {
      ...section.styles,
      ...styleUpdates
    }
  };
}

function applyElementStyles(element, styleUpdates) {
  return {
    ...element,
    styles: {
      ...element.styles,
      ...styleUpdates
    }
  };
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function inferPromptData(prompt) {
  const normalizedPrompt = prompt.toLowerCase();
  const isBookkeeping = includesAny(normalizedPrompt, [
    "buchhaltung",
    "bookkeeping",
    "invoice",
    "rechnung",
    "finanzen"
  ]);
  const isAi = includesAny(normalizedPrompt, ["ki", "ai", "künstliche", "kuenstliche"]);
  const targetAudience = includesAny(normalizedPrompt, ["freelancer", "freiberufler"])
    ? "Freelancer"
    : includesAny(normalizedPrompt, ["agentur", "agency"])
      ? "Agenturen"
      : includesAny(normalizedPrompt, ["startup", "startups"])
        ? "Startups"
        : "Teams";
  const businessName = isBookkeeping
    ? "InvoiceFlow"
    : isAi
      ? "Astra AI"
      : "Northstar";
  const description = isBookkeeping
    ? "KI-gestuetzte Buchhaltungssoftware"
    : isAi
      ? "KI-gestuetzte Workflow-Software"
      : "digitale Produktivitaetssoftware";
  const tone = includesAny(normalizedPrompt, ["modern", "sauber", "clean"])
    ? "Modern"
    : includesAny(normalizedPrompt, ["premium", "elegant"])
      ? "Premium"
      : "Clear";

  return {
    businessName,
    targetAudience,
    description,
    tone
  };
}

function getPalette(tone, description) {
  const normalizedTone = tone.toLowerCase();
  const normalizedDescription = description.toLowerCase();

  if (normalizedDescription.includes("bookkeeping") || normalizedDescription.includes("buchhaltung")) {
    return {
      hero: "#edfdf8",
      section: "#f8fafc",
      dark: "#0f2f2a",
      primary: "#0f8f70",
      accent: "#d7f8ed"
    };
  }

  if (normalizedTone.includes("premium")) {
    return {
      hero: "#f7eadc",
      section: "#fffaf3",
      dark: "#211a16",
      primary: "#8f4d2f",
      accent: "#f3dfca"
    };
  }

  return {
    hero: "#f1f7ff",
    section: "#f8fafc",
    dark: "#102033",
    primary: "#1167d8",
    accent: "#d9e8ff"
  };
}

export function createLandingPage(promptData) {
  const businessName = cleanValue(promptData.businessName, "InvoiceFlow");
  const targetAudience = cleanValue(promptData.targetAudience, "Freelancer");
  const description = cleanValue(promptData.description, "KI-Buchhaltungssoftware");
  const tone = cleanValue(promptData.tone, "Modern");
  const palette = getPalette(tone, description);
  const normalizedAudience = targetAudience.toLowerCase();
  const normalizedDescription = description.toLowerCase();

  const hero = createSection("Hero", "saas-hero");
  const features = createSection("Features", "grid-layout");
  const testimonials = createSection("Testimonials", "customer-quotes");
  const pricing = createSection("Pricing", "three-tier-pricing");
  const cta = createSection("CTA", "demo-cta");
  const footer = createSection("Footer");

  return [
    applySectionContent(applySectionStyles(hero, { backgroundColor: palette.hero }), {
      logo: updateTextElement(hero.content.logo, businessName),
      navigation: updateTextElement(hero.content.navigation, "Funktionen   Preise   Kontakt"),
      title: updateTextElement(
        applyElementStyles(hero.content.title, { color: palette.dark }),
        `${businessName} hilft ${normalizedAudience}, mit weniger Verwaltung zu arbeiten`
      ),
      text: updateTextElement(
        hero.content.text,
        `${tone} ${description} fuer ${normalizedAudience}, die klarere Workflows, schnellere Entscheidungen und weniger Handarbeit wollen.`
      ),
      button: updateTextElement(
        applyElementStyles(hero.content.button, { backgroundColor: palette.primary }),
        "Kostenlos starten"
      )
    }),
    applySectionContent(applySectionStyles(features, { backgroundColor: "#ffffff" }), {
      cards: [
        updateTextElement(
          features.content.cards[0],
          `Routine automatisieren\nVerwandle wiederkehrende Aufgaben rund um ${normalizedDescription} in gefuehrte, verlaessliche Workflows.`
        ),
        updateTextElement(
          features.content.cards[1],
          `Organisiert bleiben\nGib ${normalizedAudience} einen klaren Ort fuer Aufgaben, Dokumente und naechste Schritte.`
        ),
        updateTextElement(
          features.content.cards[2],
          `Schneller vorankommen\nStarte saubere Prozesse ohne Tabellen, verstreute Notizen oder manuelle Nacharbeit.`
        )
      ]
    }),
    applySectionContent(testimonials, {
      title: updateTextElement(testimonials.content.title, `Warum ${targetAudience} ${businessName} waehlen`),
      quotes: [
        updateTextElement(
          testimonials.content.quotes[0],
          `${businessName} gab uns einen klareren Weg fuer Arbeit, die wir vorher immer aufgeschoben haben.`
        ),
        updateTextElement(
          testimonials.content.quotes[1],
          `Das Produkt wirkt ${tone.toLowerCase()}, einfach und im Alltag wirklich nuetzlich.`
        )
      ]
    }),
    applySectionContent(pricing, {
      title: updateTextElement(pricing.content.title, "Preise, die mit deiner Arbeit wachsen"),
      plans: [
        updateTextElement(pricing.content.plans[0], `Starter\n19 EUR / Monat\nFuer einzelne ${normalizedAudience}`),
        updateTextElement(pricing.content.plans[1], "Pro\n49 EUR / Monat\nFuer wachsende Kundenarbeit"),
        updateTextElement(pricing.content.plans[2], "Studio\nIndividuell\nFuer Teams und fortgeschrittene Workflows")
      ]
    }),
    applySectionContent(applySectionStyles(cta, { backgroundColor: palette.dark }), {
      title: updateTextElement(cta.content.title, `Bereit, ${normalizedDescription} zu vereinfachen?`),
      text: updateTextElement(
        cta.content.text,
        `Schaffe mit ${businessName} einen ruhigeren Workflow fuer ${normalizedAudience}.`
      ),
      button: updateTextElement(
        applyElementStyles(cta.content.button, { color: palette.dark }),
        "Loslegen"
      )
    }),
    applySectionContent(footer, {
      text: updateTextElement(
        footer.content.text,
        `${businessName}  |  ${tone} Tools fuer ${targetAudience}`
      )
    })
  ];
}

export function createWebsiteFromPrompt(prompt) {
  const promptData = inferPromptData(cleanValue(prompt, ""));
  const sections = createLandingPage(promptData);
  const isBookkeeping =
    promptData.description.toLowerCase().includes("bookkeeping") ||
    promptData.description.toLowerCase().includes("buchhaltung");
  const faq = createSection("FAQ", "product-faq");
  const normalizedAudience = promptData.targetAudience.toLowerCase();
  const normalizedDescription = promptData.description.toLowerCase();
  const featureCopy = isBookkeeping
    ? [
        `KI-Buchhaltung\nOrdne Einnahmen, Ausgaben und Rechnungen ohne manuelle Tabellenarbeit.`,
        `Reports fuer Freelancer\nSieh Steuern, Cashflow und Kundenzahlungen in einem ruhigen Dashboard.`,
        `Smarte Erinnerungen\nVerpasse keine Belege, offenen Rechnungen oder monatlichen Buchhaltungsaufgaben.`
      ]
    : [
        `KI-Unterstuetzung\nVerwandle wiederkehrende Arbeit rund um ${normalizedDescription} in gefuehrte, verlaessliche Workflows.`,
        `Klares Dashboard\nGib ${normalizedAudience} einen Ort fuer Prioritaeten, Status und naechste Schritte.`,
        `Schneller handeln\nStarte saubere Prozesse ohne verstreute Tools oder manuelle Nacharbeit.`
      ];
  const faqSection = applySectionContent(faq, {
    title: updateTextElement(faq.content.title, `Fragen zu ${promptData.businessName}`),
    items: [
      updateTextElement(
        faq.content.items[0],
        `Ist ${promptData.businessName} fuer ${normalizedAudience} gebaut?\nJa, der Workflow orientiert sich daran, wie ${normalizedAudience} mit ${normalizedDescription} arbeiten.`
      ),
      updateTextElement(
        faq.content.items[1],
        `Kann ich schnell starten?\nJa, die Seite zeigt schnelle Einrichtung, gefuehrte Automatisierung und einen einfachen Weg zum ersten Ergebnis.`
      )
    ]
  });
  const [hero, features, testimonials, pricing, cta, footer] = sections;

  return [
    applySectionContent(hero, {
      title: updateTextElement(
        hero.content.title,
        `${promptData.businessName}: ${titleCase(promptData.description)} fuer ${promptData.targetAudience}`
      ),
      text: updateTextElement(
        hero.content.text,
        `Eine ${promptData.tone.toLowerCase()} Landingpage fuer ${normalizedAudience}, die weniger Verwaltung, klarere Finanzen und mehr Zeit fuer Kundenarbeit wollen.`
      ),
      button: updateTextElement(hero.content.button, "Kostenlos testen")
    }),
    applySectionContent(features, {
      cards: [
        updateTextElement(features.content.cards[0], featureCopy[0]),
        updateTextElement(features.content.cards[1], featureCopy[1]),
        updateTextElement(features.content.cards[2], featureCopy[2])
      ]
    }),
    testimonials,
    pricing,
    faqSection,
    applySectionContent(cta, {
      title: updateTextElement(cta.content.title, `Weniger Zeit fuer Buchhaltung aufwenden`),
      text: updateTextElement(
        cta.content.text,
        `${promptData.businessName} gibt ${normalizedAudience} einen schnelleren Weg, organisiert zu bleiben und bezahlt zu werden.`
      ),
      button: updateTextElement(cta.content.button, "Konto erstellen")
    }),
    footer
  ];
}
