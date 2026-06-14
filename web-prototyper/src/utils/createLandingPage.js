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
      ? "Agencies"
      : includesAny(normalizedPrompt, ["startup", "startups"])
        ? "Startups"
        : "Teams";
  const businessName = isBookkeeping
    ? "InvoiceFlow"
    : isAi
      ? "Astra AI"
      : "Northstar";
  const description = isBookkeeping
    ? "AI-powered bookkeeping software"
    : isAi
      ? "AI-powered workflow software"
      : "digital productivity software";
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
  const description = cleanValue(promptData.description, "AI bookkeeping software");
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
      navigation: updateTextElement(hero.content.navigation, "Features   Pricing   Contact"),
      title: updateTextElement(
        applyElementStyles(hero.content.title, { color: palette.dark }),
        `${businessName} helps ${normalizedAudience} work with less admin`
      ),
      text: updateTextElement(
        hero.content.text,
        `${tone} ${description} built for ${normalizedAudience} who want clearer workflows, faster decisions and less manual work.`
      ),
      button: updateTextElement(
        applyElementStyles(hero.content.button, { backgroundColor: palette.primary }),
        "Start free"
      )
    }),
    applySectionContent(applySectionStyles(features, { backgroundColor: "#ffffff" }), {
      cards: [
        updateTextElement(
          features.content.cards[0],
          `Automate the routine\nTurn repetitive ${normalizedDescription} tasks into guided, reliable workflows.`
        ),
        updateTextElement(
          features.content.cards[1],
          `Stay organized\nGive ${normalizedAudience} one clear place to track work, documents and next steps.`
        ),
        updateTextElement(
          features.content.cards[2],
          `Move faster\nLaunch polished processes without spreadsheets, scattered notes or manual follow-up.`
        )
      ]
    }),
    applySectionContent(testimonials, {
      title: updateTextElement(testimonials.content.title, `Why ${targetAudience} choose ${businessName}`),
      quotes: [
        updateTextElement(
          testimonials.content.quotes[0],
          `${businessName} gave us a cleaner way to handle the work we used to postpone.`
        ),
        updateTextElement(
          testimonials.content.quotes[1],
          `The product feels ${tone.toLowerCase()}, simple and genuinely useful for our day-to-day flow.`
        )
      ]
    }),
    applySectionContent(pricing, {
      title: updateTextElement(pricing.content.title, "Pricing that scales with your work"),
      plans: [
        updateTextElement(pricing.content.plans[0], `Starter\n19 EUR / Monat\nFor solo ${normalizedAudience}`),
        updateTextElement(pricing.content.plans[1], "Pro\n49 EUR / Monat\nFor growing client workloads"),
        updateTextElement(pricing.content.plans[2], "Studio\nCustom\nFor teams and advanced workflows")
      ]
    }),
    applySectionContent(applySectionStyles(cta, { backgroundColor: palette.dark }), {
      title: updateTextElement(cta.content.title, `Ready to simplify ${normalizedDescription}?`),
      text: updateTextElement(
        cta.content.text,
        `Create a calmer workflow for ${normalizedAudience} with ${businessName}.`
      ),
      button: updateTextElement(
        applyElementStyles(cta.content.button, { color: palette.dark }),
        "Get started"
      )
    }),
    applySectionContent(footer, {
      text: updateTextElement(
        footer.content.text,
        `${businessName}  |  ${tone} tools for ${targetAudience}`
      )
    })
  ];
}

export function createWebsiteFromPrompt(prompt) {
  const promptData = inferPromptData(cleanValue(prompt, ""));
  const sections = createLandingPage(promptData);
  const isBookkeeping = promptData.description.toLowerCase().includes("bookkeeping");
  const faq = createSection("FAQ", "product-faq");
  const normalizedAudience = promptData.targetAudience.toLowerCase();
  const normalizedDescription = promptData.description.toLowerCase();
  const featureCopy = isBookkeeping
    ? [
        `AI bookkeeping\nCategorize income, expenses and invoices without manual spreadsheet work.`,
        `Freelancer-ready reports\nSee taxes, cash flow and client payments in one calm dashboard.`,
        `Smart reminders\nNever miss receipts, open invoices or monthly bookkeeping tasks again.`
      ]
    : [
        `AI assistance\nTurn repetitive ${normalizedDescription} work into guided, reliable workflows.`,
        `Clear dashboard\nGive ${normalizedAudience} one place to understand priorities, status and next steps.`,
        `Faster action\nLaunch polished processes without scattered tools or manual follow-up.`
      ];
  const faqSection = applySectionContent(faq, {
    title: updateTextElement(faq.content.title, `Questions about ${promptData.businessName}`),
    items: [
      updateTextElement(
        faq.content.items[0],
        `Is ${promptData.businessName} built for ${normalizedAudience}?\nYes, the workflow is shaped around the way ${normalizedAudience} handle ${normalizedDescription}.`
      ),
      updateTextElement(
        faq.content.items[1],
        `Can I get started quickly?\nYes, the page highlights quick setup, guided automation and a simple path to the first result.`
      )
    ]
  });
  const [hero, features, testimonials, pricing, cta, footer] = sections;

  return [
    applySectionContent(hero, {
      title: updateTextElement(
        hero.content.title,
        `${promptData.businessName}: ${titleCase(promptData.description)} for ${promptData.targetAudience}`
      ),
      text: updateTextElement(
        hero.content.text,
        `A ${promptData.tone.toLowerCase()} landing page for ${normalizedAudience} who want less admin, clearer finances and more time for client work.`
      ),
      button: updateTextElement(hero.content.button, "Try it free")
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
      title: updateTextElement(cta.content.title, `Spend less time on bookkeeping`),
      text: updateTextElement(
        cta.content.text,
        `${promptData.businessName} gives ${normalizedAudience} a faster way to stay organized and get paid.`
      ),
      button: updateTextElement(cta.content.button, "Create my account")
    }),
    footer
  ];
}
