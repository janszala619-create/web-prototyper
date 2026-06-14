const sectionTypes = ["Hero", "Features", "Testimonials", "Pricing", "FAQ", "CTA", "Footer"];
const numericStyleKeys = ["padding", "margin", "borderRadius", "fontSize"];
const stringStyleKeys = ["color", "backgroundColor"];
const colorPattern = /^#[0-9a-f]{6}$/i;

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function joinParts(parts) {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .map((part) => {
      if (typeof part === "string") {
        return part;
      }

      if (isPlainObject(part)) {
        return part.label ?? part.text ?? part.title ?? part.name ?? "";
      }

      return "";
    })
    .filter((part) => part.trim())
    .join("\n");
}

function textFromValue(value, fallback) {
  if (typeof value === "string") {
    return cleanText(value, fallback);
  }

  if (!isPlainObject(value)) {
    return fallback;
  }

  return cleanText(
    value.text ??
      value.headline ??
      value.subheadline ??
      value.cta ??
      joinParts([value.title, value.description ?? value.body ?? value.answer]),
    fallback
  );
}

function cleanNumber(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);

    if (Number.isFinite(parsed)) {
      return Math.max(0, parsed);
    }
  }

  return fallback;
}

function cleanStyleValue(key, value, fallback) {
  if (numericStyleKeys.includes(key)) {
    return cleanNumber(value, fallback);
  }

  if (stringStyleKeys.includes(key) && typeof value === "string" && colorPattern.test(value.trim())) {
    return value.trim();
  }

  return fallback;
}

function mergeStyles(baseStyles = {}, aiStyles = {}) {
  const nextStyles = { ...baseStyles };
  const incomingStyles = isPlainObject(aiStyles) ? aiStyles : {};

  for (const key of [...numericStyleKeys, ...stringStyleKeys]) {
    nextStyles[key] = cleanStyleValue(key, incomingStyles[key], baseStyles[key]);
  }

  return nextStyles;
}

function mergeElement(baseElement, aiElement) {
  if (!isPlainObject(baseElement)) {
    return baseElement;
  }

  const nextElement = {
    ...baseElement,
    text: textFromValue(aiElement, baseElement.text),
    styles: mergeStyles(baseElement.styles, aiElement?.styles)
  };

  if (baseElement.image) {
    nextElement.image = {
      ...baseElement.image,
      src: typeof aiElement?.image?.src === "string" ? aiElement.image.src : baseElement.image.src,
      alt: typeof aiElement?.image?.alt === "string" ? aiElement.image.alt : baseElement.image.alt
    };
  }

  return nextElement;
}

function mergeContent(baseValue, aiValue) {
  if (Array.isArray(baseValue)) {
    const incomingItems = Array.isArray(aiValue) ? aiValue : [];

    return baseValue.map((item, index) => mergeContent(item, incomingItems[index]));
  }

  if (!isPlainObject(baseValue)) {
    return baseValue;
  }

  if ("styles" in baseValue && "text" in baseValue) {
    return mergeElement(baseValue, aiValue);
  }

  return Object.fromEntries(
    Object.entries(baseValue).map(([key, value]) => [key, mergeContent(value, aiValue?.[key])])
  );
}

function findAiSection(aiSections, type) {
  return aiSections.find(
    (section) => typeof section?.type === "string" && section.type.toLowerCase() === type.toLowerCase()
  );
}

function itemText(item, fallback) {
  if (typeof item === "string") {
    return cleanText(item, fallback);
  }

  if (!isPlainObject(item)) {
    return fallback;
  }

  return cleanText(
    item.text ??
      item.quote ??
      joinParts([
        item.title ?? item.name ?? item.question,
        item.description ?? item.body ?? item.position ?? item.price ?? item.answer,
        Array.isArray(item.features) ? item.features.join(", ") : ""
      ]),
    fallback
  );
}

function listFromContent(content, keys) {
  for (const key of keys) {
    if (Array.isArray(content?.[key])) {
      return content[key];
    }
  }

  return [];
}

function coerceGeneratedContent(baseSection, aiSection) {
  const content = aiSection?.content ?? aiSection ?? {};

  switch (baseSection.type) {
    case "Hero":
      return {
        ...content,
        logo: content.logo ?? aiSection?.businessName,
        title: content.title ?? content.headline ?? aiSection?.headline,
        text: content.text ?? content.subheadline ?? content.description ?? aiSection?.subheadline,
        button: content.button ?? content.cta ?? content.ctaButton ?? aiSection?.cta,
        navigation: content.navigation
      };
    case "Features":
      return {
        ...content,
        cards: listFromContent(content, ["cards", "features", "items"]).map((item) => ({
          text: itemText(item, "")
        }))
      };
    case "Testimonials":
      return {
        ...content,
        title: content.title,
        quotes: listFromContent(content, ["quotes", "testimonials", "items"]).map((item) => ({
          text: itemText(item, "")
        }))
      };
    case "Pricing":
      return {
        ...content,
        title: content.title,
        plans: listFromContent(content, ["plans", "pricing", "packages", "items"]).map((item) => ({
          text: itemText(item, "")
        }))
      };
    case "FAQ":
      return {
        ...content,
        title: content.title,
        items: listFromContent(content, ["items", "faq", "faqs", "questions"]).map((item) => ({
          text: itemText(item, "")
        }))
      };
    case "CTA":
      return {
        ...content,
        title: content.title ?? content.headline,
        text: content.text ?? content.description ?? content.subheadline,
        button: content.button ?? content.cta ?? content.ctaButton
      };
    case "Footer":
      return {
        ...content,
        text: content.text ?? content.copyright ?? content.links
      };
    default:
      return content;
  }
}

export function normalizeGeneratedWebsite(aiWebsite, fallbackWebsite) {
  const aiSections = Array.isArray(aiWebsite?.sections) ? aiWebsite.sections : [];

  return {
    template: typeof aiWebsite?.template === "string" ? aiWebsite.template : fallbackWebsite.template,
    designSystem: isPlainObject(aiWebsite?.designSystem)
      ? aiWebsite.designSystem
      : fallbackWebsite.designSystem,
    sections: fallbackWebsite.sections.map((baseSection) => {
      const aiSection = findAiSection(aiSections, baseSection.type);
      const aiContent = coerceGeneratedContent(baseSection, aiSection);

      return {
        ...baseSection,
        styles: mergeStyles(baseSection.styles, aiSection?.styles),
        content: mergeContent(baseSection.content, aiContent)
      };
    })
  };
}

export function normalizeSectionsForEditor(sections, fallbackSections) {
  if (!Array.isArray(sections)) {
    return fallbackSections;
  }

  if (sections.length === 0) {
    return [];
  }

  const incomingSections = sections;
  const normalizedSections = incomingSections
    .filter((section) => isPlainObject(section))
    .map((section, index) => {
      const fallbackSection =
        fallbackSections.find(
          (item) =>
            typeof section.type === "string" &&
            typeof item.type === "string" &&
            item.type.toLowerCase() === section.type.toLowerCase()
        ) ??
        fallbackSections[index] ??
        fallbackSections[0];

      if (!fallbackSection) {
        return null;
      }

      const normalized = normalizeGeneratedWebsite(
        { template: "", designSystem: {}, sections: [section] },
        { template: "", designSystem: {}, sections: [fallbackSection] }
      ).sections[0];

      return {
        ...normalized,
        id: cleanText(section.id, normalized.id)
      };
    })
    .filter(Boolean);

  return normalizedSections.length ? normalizedSections : fallbackSections;
}

export function normalizeImprovedWebsite(aiWebsite, currentSections) {
  const aiSections = Array.isArray(aiWebsite?.sections) ? aiWebsite.sections : [];

  return {
    sections: currentSections.map((baseSection, index) => {
      const aiSection =
        aiSections.find((section) => section?.id === baseSection.id) ??
        aiSections.find((section) => section?.type === baseSection.type) ??
        aiSections[index];

      return {
        ...baseSection,
        styles: mergeStyles(baseSection.styles, aiSection?.styles),
        content: mergeContent(baseSection.content, aiSection?.content)
      };
    }),
    designSystemSuggestions: isPlainObject(aiWebsite?.designSystemSuggestions)
      ? aiWebsite.designSystemSuggestions
      : {}
  };
}

export function hasExpectedGeneratedSections(website) {
  const types = new Set((website?.sections ?? []).map((section) => section?.type));

  return sectionTypes.every((type) => types.has(type));
}
