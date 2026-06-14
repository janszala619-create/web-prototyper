import { createSection } from "../data/initialElements.js";
import { generateWebsiteWithAI as requestGeneratedWebsite } from "./aiClient.js";
import { getGoalCta, getIndustryPreset, industryOptions, mainGoalOptions } from "./industryPresets.js";
import { normalizeGeneratedWebsite } from "./sectionNormalizer.js";
import { getTonePreset, toneOptions } from "./tonePresets.js";

function cleanValue(value, fallback) {
  const trimmed = String(value ?? "").trim();

  return trimmed || fallback;
}

function normalizeOption(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function titleCase(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function updateText(element, text, styles = {}) {
  return {
    ...element,
    text,
    styles: {
      ...element.styles,
      ...styles
    }
  };
}

function updateSection(section, styles, content = {}) {
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

function cloneElement(element, id, label, text, styles = {}) {
  return {
    ...element,
    id,
    label,
    text,
    styles: {
      ...element.styles,
      ...styles
    }
  };
}

function generatedId(base, index) {
  return `ai-${base}-${Date.now().toString(36)}-${index}`;
}

function buildDesignSystem(tone, industry, preset) {
  return {
    tone,
    industry,
    colors: {
      primary: preset.primary,
      secondary: preset.secondary,
      hero: preset.hero,
      surface: preset.surface,
      muted: preset.muted,
      dark: preset.dark,
      text: preset.text
    },
    typography: {
      heroFontSize: preset.heroFontSize,
      bodyFontSize: 18,
      copyStyle: preset.copyStyle
    },
    spacing: {
      sectionPadding: preset.sectionPadding
    },
    buttons: {
      borderRadius: preset.buttonRadius,
      backgroundColor: preset.primary,
      color: tone === "Luxury" ? "#111111" : "#ffffff"
    }
  };
}

function buildHeadline(industry, businessName, audience, description, mainGoal) {
  if (industry === "SaaS" && description.toLowerCase().includes("bookkeeping")) {
    return `Automate Your ${audience.replace(/s$/, "")} Accounting`;
  }

  if (mainGoal === "Showcase work") {
    return `${businessName} Work That Speaks Clearly`;
  }

  if (mainGoal === "Book appointments") {
    return `Book ${businessName} With Confidence`;
  }

  return `${businessName} for ${audience}`;
}

function buildSubheadline(industry, audience, description, tonePreset) {
  if (industry === "SaaS" && description.toLowerCase().includes("bookkeeping")) {
    return "Save hours every month with AI-powered bookkeeping.";
  }

  return `${titleCase(description)} for ${audience}, shaped with a ${tonePreset.copyStyle} message that makes the next step clear.`;
}

export function generateWebsite(input = {}) {
  const industry = normalizeOption(input.industry, industryOptions, "Other");
  const tone = normalizeOption(input.tone, toneOptions, "Modern");
  const mainGoal = normalizeOption(input.mainGoal, mainGoalOptions, "Get leads");
  const industryPreset = getIndustryPreset(industry);
  const tonePreset = getTonePreset(tone);
  const businessName = cleanValue(input.businessName, industryPreset.defaultName);
  const audience = cleanValue(input.audience, industryPreset.defaultAudience);
  const description = cleanValue(input.description, industryPreset.defaultDescription);
  const ctaText = getGoalCta(industry, mainGoal);
  const designSystem = buildDesignSystem(tone, industry, tonePreset);

  const hero = createSection("Hero", tone === "Startup" ? "startup-hero" : "saas-hero");
  const features = createSection("Features", "card-layout");
  const testimonials = createSection("Testimonials", "customer-quotes");
  const pricing = createSection("Pricing", "three-tier-pricing");
  const faq = createSection("FAQ", "product-faq");
  const cta = createSection("CTA", "demo-cta");
  const footer = createSection("Footer");

  const heroTextColor = tone === "Luxury" ? "#fffaf3" : tonePreset.text;
  const heroSoftColor = tone === "Luxury" ? "#d8c7a1" : tonePreset.softText;
  const sectionSurface = tone === "Luxury" ? tonePreset.surface : "#ffffff";

  return {
    template: industryPreset.template,
    designSystem,
    sections: [
      updateSection(
        hero,
        {
          backgroundColor: tonePreset.hero,
          color: heroTextColor,
          padding: tonePreset.sectionPadding
        },
        {
          logo: updateText(hero.content.logo, businessName, {
            color: heroTextColor,
            fontSize: 23
          }),
          navigation: updateText(hero.content.navigation, "Features   Pricing   FAQ", {
            color: heroSoftColor
          }),
          title: updateText(
            hero.content.title,
            buildHeadline(industry, businessName, audience, description, mainGoal),
            {
              color: heroTextColor,
              fontSize: tonePreset.heroFontSize
            }
          ),
          text: updateText(
            hero.content.text,
            buildSubheadline(industry, audience, description, tonePreset),
            {
              color: heroSoftColor,
              fontSize: 19
            }
          ),
          button: updateText(hero.content.button, ctaText, designSystem.buttons),
          visual: {
            ...hero.content.visual,
            styles: {
              ...hero.content.visual.styles,
              backgroundColor: tone === "Luxury" ? "#211a16" : tonePreset.surface,
              borderRadius: tonePreset.buttonRadius
            }
          }
        }
      ),
      updateSection(
        features,
        {
          backgroundColor: sectionSurface,
          padding: tonePreset.sectionPadding
        },
        {
          cards: industryPreset.features.map(([title, body], index) =>
            cloneElement(
              features.content.cards[index % features.content.cards.length],
              generatedId("feature", index),
              `Feature ${index + 1}`,
              `${title}\n${body}`,
              {
                backgroundColor: tonePreset.muted,
                borderRadius: tonePreset.buttonRadius
              }
            )
          )
        }
      ),
      updateSection(
        testimonials,
        {
          backgroundColor: tonePreset.muted,
          padding: tonePreset.sectionPadding
        },
        {
          title: updateText(testimonials.content.title, `Trusted by ${audience}`, {
            color: tonePreset.text
          }),
          quotes: industryPreset.testimonials.map(([name, position, quote], index) =>
            cloneElement(
              testimonials.content.quotes[index % testimonials.content.quotes.length],
              generatedId("testimonial", index),
              `Testimonial ${index + 1}`,
              `${quote}\n- ${name}, ${position}`,
              {
                backgroundColor: tonePreset.surface,
                borderRadius: tonePreset.buttonRadius
              }
            )
          )
        }
      ),
      updateSection(
        pricing,
        {
          backgroundColor: sectionSurface,
          padding: tonePreset.sectionPadding
        },
        {
          title: updateText(
            pricing.content.title,
            industry === "SaaS" || industry === "E-Commerce"
              ? "Choose the plan that fits your next step"
              : "Choose the package that fits your next step"
          ),
          plans: industryPreset.pricing.map(([name, price, details], index) =>
            cloneElement(
              pricing.content.plans[index],
              generatedId("pricing", index),
              `Package ${index + 1}`,
              `${name}\n${price}\n${details}`,
              {
                backgroundColor: index === 1 ? tonePreset.hero : tonePreset.muted,
                borderRadius: tonePreset.buttonRadius
              }
            )
          )
        }
      ),
      updateSection(
        faq,
        {
          backgroundColor: tonePreset.muted,
          padding: tonePreset.sectionPadding
        },
        {
          title: updateText(faq.content.title, "Questions before you start"),
          items: [
            [`Is ${businessName} built for ${audience}?`, `Yes, the offer is shaped around ${audience} looking for ${description}.`],
            ["How quickly can someone get started?", "The page makes the first step clear, simple and low-friction."],
            ["Can this page be edited later?", "Yes, every generated block is a normal editable section in the builder."],
            ["Does the export work offline?", "Yes, the exported HTML includes page structure and styles without editor code."],
            ["What should visitors do next?", `The main action is clear: ${ctaText}.`]
          ].map(([question, answer], index) =>
            cloneElement(
              faq.content.items[index % faq.content.items.length],
              generatedId("faq", index),
              `FAQ ${index + 1}`,
              `${question}\n${answer}`,
              {
                backgroundColor: tonePreset.surface,
                borderRadius: tonePreset.buttonRadius
              }
            )
          )
        }
      ),
      updateSection(
        cta,
        {
          backgroundColor: tonePreset.dark,
          padding: tonePreset.sectionPadding
        },
        {
          title: updateText(cta.content.title, `Ready to move forward with ${businessName}?`, {
            color: "#ffffff"
          }),
          text: updateText(
            cta.content.text,
            `Give ${audience} a clear reason to act today with a page built around ${description}.`,
            { color: "#dbe3ee" }
          ),
          button: updateText(cta.content.button, ctaText, designSystem.buttons)
        }
      ),
      updateSection(
        footer,
        {
          backgroundColor: tonePreset.dark,
          padding: 32
        },
        {
          text: updateText(
            footer.content.text,
            `Copyright ${new Date().getFullYear()} ${businessName}  |  Features   Pricing   Contact`,
            {
              color: "#ffffff"
            }
          )
        }
      )
    ]
  };
}

export function generateWebsiteWithAI(input) {
  // Server-side OpenAI call lives in /api/generate-website.
  // Never pass or store an API key in the Vite frontend.
  return requestGeneratedWebsite(input).then((aiWebsite) =>
    normalizeGeneratedWebsite(aiWebsite, generateWebsite(input))
  );
}
