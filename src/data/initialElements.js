const sectionTypeLabels = {
  Hero: "Hero",
  Features: "Features",
  CTA: "CTA",
  Testimonials: "Testimonials",
  Pricing: "Pricing",
  FAQ: "FAQ",
  Contact: "Contact",
  Footer: "Footer"
};

export const sectionTypes = Object.keys(sectionTypeLabels);

const baseTextStyle = {
  color: "#172033",
  backgroundColor: "transparent",
  padding: 0,
  margin: 0,
  borderRadius: 0,
  fontSize: 16
};

function styles(overrides = {}) {
  return {
    color: "#172033",
    backgroundColor: "#ffffff",
    padding: 56,
    margin: 0,
    borderRadius: 0,
    fontSize: 16,
    ...overrides
  };
}

function textElement(id, label, tag, text, styleOverrides = {}) {
  return {
    id,
    label,
    tag,
    text,
    styles: {
      ...baseTextStyle,
      ...styleOverrides
    }
  };
}

function visualElement(id, label, tag, styleOverrides = {}) {
  return {
    ...textElement(id, label, tag, "", styleOverrides),
    image: {
      src: "",
      alt: ""
    }
  };
}

function section(id, type, styleOverrides, content) {
  return {
    id,
    type,
    label: sectionTypeLabels[type],
    tag: "section",
    text: "",
    content,
    styles: styles(styleOverrides)
  };
}

export const initialSections = [
  section(
    "hero-section",
    "Hero",
    {
      backgroundColor: "#f1f7ff",
      padding: 72
    },
    {
      logo: textElement("hero-logo", "Logo", "div", "Northstar", {
        color: "#102033",
        fontSize: 22
      }),
      navigation: textElement(
        "hero-navigation",
        "Navigation",
        "nav",
        "Leistungen   Referenzen   Preise",
        {
          color: "#566070",
          fontSize: 15
        }
      ),
      title: textElement(
        "hero-title",
        "Hero Ueberschrift",
        "h1",
        "Digitale Produkte schneller sichtbar machen",
        {
          color: "#102033",
          fontSize: 52
        }
      ),
      text: textElement(
        "hero-text",
        "Hero Text",
        "p",
        "Erstelle klare Landingpages, passe Inhalte live an und exportiere dein Ergebnis als eigenstaendige HTML-Datei.",
        {
          color: "#4c5a68",
          margin: 20,
          fontSize: 19
        }
      ),
      button: textElement("hero-button", "Hero Button", "button", "Projekt starten", {
        color: "#ffffff",
        backgroundColor: "#1167d8",
        padding: 16,
        margin: 4,
        borderRadius: 8,
        fontSize: 16
      }),
      visual: visualElement("hero-visual", "Hero Visual", "div", {
        backgroundColor: "#ffffff",
        padding: 22,
        borderRadius: 8
      })
    }
  ),
  section(
    "features-section",
    "Features",
    {
      backgroundColor: "#ffffff",
      padding: 56
    },
    {
      cards: [
        textElement(
          "feature-one",
          "Feature Karte 1",
          "article",
          "Schnelle Iteration\nTexte, Farben und Abstaende direkt im Canvas anpassen.",
          {
            backgroundColor: "#f7f9fc",
            padding: 26,
            borderRadius: 8
          }
        ),
        textElement(
          "feature-two",
          "Feature Karte 2",
          "article",
          "Klare Struktur\nHeader, Hero, Karten und Footer bleiben sauber getrennt.",
          {
            backgroundColor: "#f7f9fc",
            padding: 26,
            borderRadius: 8
          }
        ),
        textElement(
          "feature-three",
          "Feature Karte 3",
          "article",
          "Echter Export\nDer aktuelle Stand wird als komplette HTML-Datei gespeichert.",
          {
            backgroundColor: "#f7f9fc",
            padding: 26,
            borderRadius: 8
          }
        )
      ]
    }
  ),
  section(
    "cta-section",
    "CTA",
    {
      color: "#ffffff",
      backgroundColor: "#172033",
      padding: 58
    },
    {
      title: textElement("cta-title", "CTA Ueberschrift", "h2", "Bereit fuer den naechsten Entwurf?", {
        color: "#ffffff",
        fontSize: 34
      }),
      text: textElement(
        "cta-text",
        "CTA Text",
        "p",
        "Passe deine Landingpage live an und teile den exportierten Stand direkt mit deinem Team.",
        {
          color: "#cbd5e1",
          margin: 14,
          fontSize: 18
        }
      ),
      button: textElement("cta-button", "CTA Button", "button", "HTML exportieren", {
        color: "#172033",
        backgroundColor: "#ffffff",
        padding: 14,
        borderRadius: 8,
        fontSize: 16
      })
    }
  ),
  section(
    "testimonials-section",
    "Testimonials",
    {
      backgroundColor: "#eef6f4",
      padding: 56
    },
    {
      title: textElement("testimonials-title", "Testimonials Ueberschrift", "h2", "Feedback aus dem Team", {
        color: "#102033",
        fontSize: 32
      }),
      quotes: [
        textElement("testimonial-one", "Testimonial 1", "blockquote", "Endlich koennen wir Varianten in Minuten statt Tagen pruefen.", {
          backgroundColor: "#ffffff",
          padding: 24,
          borderRadius: 8
        }),
        textElement("testimonial-two", "Testimonial 2", "blockquote", "Der Export ist sauber genug, um sofort weiterzugeben.", {
          backgroundColor: "#ffffff",
          padding: 24,
          borderRadius: 8
        })
      ]
    }
  ),
  section(
    "pricing-section",
    "Pricing",
    {
      backgroundColor: "#ffffff",
      padding: 56
    },
    {
      title: textElement("pricing-title", "Pricing Ueberschrift", "h2", "Einfache Pakete", {
        color: "#102033",
        fontSize: 32
      }),
      plans: [
        textElement("pricing-one", "Preis Paket 1", "article", "Starter\n29 EUR / Monat\nFuer schnelle Prototypen", {
          backgroundColor: "#f7f9fc",
          padding: 26,
          borderRadius: 8
        }),
        textElement("pricing-two", "Preis Paket 2", "article", "Team\n79 EUR / Monat\nFuer laufende Kampagnen", {
          backgroundColor: "#f1f7ff",
          padding: 26,
          borderRadius: 8
        }),
        textElement("pricing-three", "Preis Paket 3", "article", "Scale\nIndividuell\nFuer groessere Workflows", {
          backgroundColor: "#f7f9fc",
          padding: 26,
          borderRadius: 8
        })
      ]
    }
  ),
  section(
    "faq-section",
    "FAQ",
    {
      backgroundColor: "#f8fafc",
      padding: 56
    },
    {
      title: textElement("faq-title", "FAQ Ueberschrift", "h2", "Haeufige Fragen", {
        color: "#102033",
        fontSize: 32
      }),
      items: [
        textElement("faq-one", "FAQ 1", "article", "Kann ich den Code exportieren?\nJa, als vollstaendige HTML-Datei mit eingebettetem CSS.", {
          backgroundColor: "#ffffff",
          padding: 22,
          borderRadius: 8
        }),
        textElement("faq-two", "FAQ 2", "article", "Bleibt Undo erhalten?\nJa, alle Section-Aktionen laufen durch dieselbe History.", {
          backgroundColor: "#ffffff",
          padding: 22,
          borderRadius: 8
        })
      ]
    }
  ),
  section(
    "contact-section",
    "Contact",
    {
      color: "#ffffff",
      backgroundColor: "#102033",
      padding: 56
    },
    {
      title: textElement("contact-title", "Kontakt Ueberschrift", "h2", "Projekt besprechen", {
        color: "#ffffff",
        fontSize: 32
      }),
      text: textElement("contact-text", "Kontakt Text", "p", "Schreib uns, wenn du aus dem Prototyp den naechsten Stand machen willst.", {
        color: "#cbd5e1",
        margin: 14,
        fontSize: 18
      }),
      email: textElement("contact-email", "Kontakt E-Mail", "p", "hello@northstar.example", {
        color: "#ffffff",
        fontSize: 18
      }),
      button: textElement("contact-button", "Kontakt Button", "button", "Kontakt aufnehmen", {
        color: "#102033",
        backgroundColor: "#38e6b5",
        padding: 14,
        borderRadius: 8
      })
    }
  ),
  section(
    "footer-section",
    "Footer",
    {
      color: "#ffffff",
      backgroundColor: "#172033",
      padding: 30
    },
    {
      text: textElement("footer-text", "Footer Text", "footer", "Northstar  |  Prototype ready", {
        color: "#ffffff",
        fontSize: 15
      })
    }
  )
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function applyOverrides(value, overrides) {
  if (Array.isArray(value)) {
    return value.map((item) => applyOverrides(item, overrides));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const override = overrides[value.id] ?? {};
  const nextValue = {
    ...value,
    ...override,
    styles: value.styles
      ? {
          ...value.styles,
          ...(override.styles ?? {})
        }
      : value.styles
  };

  if (value.content) {
    nextValue.content = applyOverrides(value.content, overrides);
  }

  for (const [key, child] of Object.entries(value)) {
    if (
      key !== "content" &&
      key !== "styles" &&
      (Array.isArray(child) || (child && typeof child === "object"))
    ) {
      nextValue[key] = applyOverrides(child, overrides);
    }
  }

  return nextValue;
}

function createTemplate(baseSections, overrides) {
  return applyOverrides(clone(baseSections), overrides);
}

function variantId(name) {
  return name.toLowerCase().replaceAll(" ", "-");
}

function sectionVariant(type, name, description, overrides) {
  const baseSection = initialSections.find((item) => item.type === type) ?? initialSections[0];

  return {
    id: variantId(name),
    name,
    description,
    section: createTemplate([baseSection], overrides)[0]
  };
}

export const sectionLibrary = [
  {
    type: "Hero",
    label: "Hero",
    variants: [
      sectionVariant("Hero", "Startup Hero", "Bold launch section with product-first copy.", {
        "hero-section": { styles: { backgroundColor: "#eef6ff", padding: 78 } },
        "hero-logo": { text: "Launchpad" },
        "hero-navigation": { text: "Product   Roadmap   Contact" },
        "hero-title": { text: "Launch your idea before the market moves", styles: { fontSize: 56 } },
        "hero-text": {
          text: "Prototype the story, validate the offer and get a polished first page online fast."
        },
        "hero-button": { text: "Validate now", styles: { backgroundColor: "#0f6bff" } }
      }),
      sectionVariant("Hero", "SaaS Hero", "Clean software landing page hero.", {
        "hero-section": { styles: { backgroundColor: "#f1f7ff", padding: 72 } },
        "hero-logo": { text: "Northstar" },
        "hero-navigation": { text: "Features   Pricing   Demo" },
        "hero-title": { text: "A calmer workflow for growing teams" },
        "hero-text": {
          text: "Bring planning, reviews and launches into one visual workspace your team can actually use."
        },
        "hero-button": { text: "Book demo" }
      }),
      sectionVariant("Hero", "Agency Hero", "High-contrast hero for service teams.", {
        "hero-section": {
          styles: { color: "#ffffff", backgroundColor: "#102033", padding: 76 }
        },
        "hero-logo": { text: "Signalhaus", styles: { color: "#ffffff" } },
        "hero-navigation": { text: "Strategy   Campaigns   Cases", styles: { color: "#cbd5e1" } },
        "hero-title": {
          text: "Campaign systems that turn attention into demand",
          styles: { color: "#ffffff", fontSize: 54 }
        },
        "hero-text": {
          text: "Positioning, creative and landing pages built for sharper launch cycles.",
          styles: { color: "#cbd5e1" }
        },
        "hero-button": {
          text: "Request a case study",
          styles: { color: "#0f172a", backgroundColor: "#38e6b5", borderRadius: 6 }
        }
      })
    ]
  },
  {
    type: "Features",
    label: "Features",
    variants: [
      sectionVariant("Features", "Grid Layout", "Three balanced benefits in a simple grid.", {
        "features-section": { styles: { backgroundColor: "#ffffff", padding: 56 } },
        "feature-one": { text: "Plan faster\nTurn rough page ideas into editable sections." },
        "feature-two": { text: "Edit visually\nTune copy, color and spacing directly on the canvas." },
        "feature-three": { text: "Export cleanly\nDownload a complete offline HTML prototype." }
      }),
      sectionVariant("Features", "Card Layout", "Soft cards for product or service highlights.", {
        "features-section": { styles: { backgroundColor: "#eef2f7", padding: 62 } },
        "feature-one": { styles: { backgroundColor: "#ffffff", borderRadius: 12 } },
        "feature-two": { styles: { backgroundColor: "#ffffff", borderRadius: 12 } },
        "feature-three": { styles: { backgroundColor: "#ffffff", borderRadius: 12 } }
      }),
      sectionVariant("Features", "Icon Layout", "Feature cards with icon-style labels in the copy.", {
        "features-section": { styles: { backgroundColor: "#f8fafc", padding: 58 } },
        "feature-one": { text: "01 Fast setup\nStart from structured sections instead of blank pages." },
        "feature-two": { text: "02 Live preview\nCheck desktop, tablet and mobile while editing." },
        "feature-three": { text: "03 Portable output\nKeep every style embedded in one HTML file." }
      })
    ]
  },
  {
    type: "Pricing",
    label: "Pricing",
    variants: [
      sectionVariant("Pricing", "Simple Pricing", "Single clear offer with light supporting plans.", {
        "pricing-title": { text: "Simple pricing for fast prototypes" },
        "pricing-one": { text: "Starter\nFree\nExplore the editor" },
        "pricing-two": { text: "Pro\n29 EUR / Monat\nExport unlimited prototypes" },
        "pricing-three": { text: "Team\n79 EUR / Monat\nCollaborate on landing pages" }
      }),
      sectionVariant("Pricing", "Three Tier Pricing", "Classic three-column SaaS pricing.", {
        "pricing-title": { text: "Choose the right workspace" },
        "pricing-one": { text: "Basic\n19 EUR / Monat\nFor solo builders" },
        "pricing-two": {
          text: "Growth\n59 EUR / Monat\nFor active teams",
          styles: { backgroundColor: "#f1f7ff" }
        },
        "pricing-three": { text: "Scale\n149 EUR / Monat\nFor launch systems" }
      }),
      sectionVariant("Pricing", "Enterprise Pricing", "Enterprise-first pricing prompt.", {
        "pricing-title": { text: "Built for larger launch teams" },
        "pricing-one": { text: "Pilot\nCustom\nValidate one workflow" },
        "pricing-two": { text: "Business\nCustom\nRoll out across teams" },
        "pricing-three": {
          text: "Enterprise\nCustom\nSecurity, support and onboarding",
          styles: { backgroundColor: "#dcfce7" }
        }
      })
    ]
  },
  {
    type: "Testimonials",
    label: "Testimonials",
    variants: [
      sectionVariant("Testimonials", "Customer Quotes", "Two concise customer proof points.", {
        "testimonials-title": { text: "Teams ship clearer pages" },
        "testimonial-one": { text: "We moved from vague wireframes to a page everyone could react to." },
        "testimonial-two": { text: "The export gave our developer a clean handoff in one click." }
      }),
      sectionVariant("Testimonials", "Founder Quotes", "Founder-style social proof.", {
        "testimonials-section": { styles: { backgroundColor: "#fff7ed" } },
        "testimonials-title": { text: "Built for early decisions" },
        "testimonial-one": { text: "It helped us pressure-test positioning before writing production code." },
        "testimonial-two": { text: "We finally had a prototype that looked real enough to discuss." }
      }),
      sectionVariant("Testimonials", "Team Feedback", "Internal team feedback block.", {
        "testimonials-section": { styles: { backgroundColor: "#eef6f4" } },
        "testimonials-title": { text: "Feedback from the launch team" },
        "testimonial-one": { text: "Marketing could update copy without waiting on design." },
        "testimonial-two": { text: "Product could compare variants across breakpoints instantly." }
      })
    ]
  },
  {
    type: "FAQ",
    label: "FAQ",
    variants: [
      sectionVariant("FAQ", "Product FAQ", "General product questions.", {
        "faq-title": { text: "Product FAQ" },
        "faq-one": { text: "Can I edit every section?\nYes, section content and core styles stay editable." },
        "faq-two": { text: "Does export need a server?\nNo, the HTML file works offline." }
      }),
      sectionVariant("FAQ", "Launch FAQ", "Questions for launch-page buyers.", {
        "faq-title": { text: "Launch questions" },
        "faq-one": { text: "Can I switch templates?\nYes, templates remain available from the toolbar." },
        "faq-two": { text: "Can I reorder sections?\nYes, every section includes move controls." }
      }),
      sectionVariant("FAQ", "Support FAQ", "Support and handoff questions.", {
        "faq-title": { text: "Support FAQ" },
        "faq-one": { text: "Is my work saved?\nYes, the editor persists state in localStorage." },
        "faq-two": { text: "Can developers use the export?\nYes, styles and markup are embedded in one file." }
      })
    ]
  },
  {
    type: "CTA",
    label: "CTA",
    variants: [
      sectionVariant("CTA", "Demo CTA", "Centered call to book a demo.", {
        "cta-title": { text: "See the prototype in action" },
        "cta-text": { text: "Create a polished page draft and share it before the next meeting." },
        "cta-button": { text: "Book demo" }
      }),
      sectionVariant("CTA", "Download CTA", "Export-focused CTA.", {
        "cta-section": { styles: { backgroundColor: "#0f172a" } },
        "cta-title": { text: "Export a clean offline prototype" },
        "cta-text": { text: "Keep the current page as a standalone HTML file with embedded CSS." },
        "cta-button": { text: "Export now" }
      }),
      sectionVariant("CTA", "Contact CTA", "Service-oriented CTA.", {
        "cta-section": { styles: { backgroundColor: "#211a16" } },
        "cta-title": { text: "Need a sharper landing page?" },
        "cta-text": { text: "Start with a visual prototype and refine the offer from there." },
        "cta-button": { text: "Start a project" }
      })
    ]
  },
  {
    type: "Contact",
    label: "Contact",
    variants: [
      sectionVariant("Contact", "Simple Contact", "Basic contact block with email.", {
        "contact-title": { text: "Get in touch" },
        "contact-text": { text: "Send a note and we will respond with next steps." },
        "contact-email": { text: "hello@example.com" },
        "contact-button": { text: "Contact us" }
      }),
      sectionVariant("Contact", "Agency Contact", "Dark agency contact prompt.", {
        "contact-section": { styles: { backgroundColor: "#0f172a" } },
        "contact-title": { text: "Plan your next campaign" },
        "contact-text": { text: "Tell us what you are launching and where the page needs to perform." },
        "contact-email": { text: "studio@agency.example" },
        "contact-button": { text: "Send brief" }
      }),
      sectionVariant("Contact", "Sales Contact", "Sales-oriented contact handoff.", {
        "contact-section": { styles: { backgroundColor: "#102033" } },
        "contact-title": { text: "Talk to sales" },
        "contact-text": { text: "For teams that need onboarding, support and repeatable launch workflows." },
        "contact-email": { text: "sales@example.com" },
        "contact-button": { text: "Request pricing" }
      })
    ]
  }
];

function rekeyValue(value, sectionId) {
  if (Array.isArray(value)) {
    return value.map((item, index) => rekeyValue(item, `${sectionId}-${index + 1}`));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const nextValue = { ...value };

  if (value.id) {
    const suffix = value.id.split("-").slice(1).join("-") || value.id;
    nextValue.id = `${sectionId}-${suffix}`;
  }

  for (const [key, child] of Object.entries(value)) {
    if (Array.isArray(child) || (child && typeof child === "object")) {
      nextValue[key] = rekeyValue(child, sectionId);
    }
  }

  return nextValue;
}

export function cloneSections(sections) {
  return clone(sections);
}

export function createSection(type, variantToCreate) {
  const blueprint =
    sectionLibrary
      .find((group) => group.type === type)
      ?.variants.find((variant) => variant.id === variantToCreate)?.section ??
    initialSections.find((item) => item.type === type) ??
    initialSections[0];
  const sectionId = `${type.toLowerCase()}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;

  return rekeyValue(clone(blueprint), sectionId);
}

export function duplicateSection(sectionToDuplicate) {
  const sectionId = `${sectionToDuplicate.type.toLowerCase()}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;

  return rekeyValue(clone(sectionToDuplicate), sectionId);
}

export function legacyElementsToSections(elements) {
  const sections = clone(initialSections);

  if (!elements || typeof elements !== "object") {
    return sections;
  }

  const legacyMap = {
    "hero-logo": "logo",
    "hero-navigation": "navigation",
    "hero-title": "heroTitle",
    "hero-text": "heroText",
    "hero-button": "heroButton",
    "hero-visual": "heroVisual",
    "feature-one": "featureOne",
    "feature-two": "featureTwo",
    "feature-three": "featureThree"
  };

  function mergeLegacy(value) {
    if (Array.isArray(value)) {
      value.forEach(mergeLegacy);
      return;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    const legacyId = legacyMap[value.id];
    const legacyElement = elements[legacyId];

    if (legacyElement) {
      value.text = legacyElement.text ?? value.text;
      value.styles = {
        ...value.styles,
        ...(legacyElement.styles ?? {})
      };
    }

    Object.values(value).forEach(mergeLegacy);
  }

  sections.forEach((item) => {
    const legacySection = elements[item.type === "Hero" ? "hero" : item.type === "Features" ? "features" : ""];

    if (legacySection) {
      item.styles = {
        ...item.styles,
        ...(legacySection.styles ?? {})
      };
    }

    mergeLegacy(item.content);
  });

  return sections;
}

export const landingTemplates = {
  saas: {
    id: "saas",
    label: "SaaS",
    sections: initialSections
  },
  portfolio: {
    id: "portfolio",
    label: "Portfolio",
    sections: createTemplate(initialSections, {
      "hero-section": { styles: { backgroundColor: "#f7eadc", padding: 80 } },
      "hero-logo": { text: "Mira Studio", styles: { color: "#211a16", fontSize: 24 } },
      "hero-navigation": { text: "Arbeiten   Profil   Kontakt", styles: { color: "#7b6250" } },
      "hero-title": {
        text: "Visuelle Identitaeten mit ruhiger Praezision",
        styles: { color: "#211a16", fontSize: 56 }
      },
      "hero-text": {
        text: "Portfolio fuer Brand Design, Editorial Systeme und digitale Auftritte mit klarer Haltung.",
        styles: { color: "#6c5748", fontSize: 20 }
      },
      "hero-button": {
        text: "Arbeiten ansehen",
        styles: { backgroundColor: "#8f4d2f", borderRadius: 999 }
      },
      "features-section": { label: "Projekt Auswahl", styles: { backgroundColor: "#fffaf3", padding: 60 } },
      "feature-one": {
        label: "Projekt 1",
        text: "Brand Systems\nFlexible Designsprachen fuer junge Produkte und Teams.",
        styles: { backgroundColor: "#f3dfca", borderRadius: 18 }
      },
      "feature-two": {
        label: "Projekt 2",
        text: "Editorial Design\nTypografische Layouts fuer Magazine, Reports und Kampagnen.",
        styles: { backgroundColor: "#f8efe6", borderRadius: 18 }
      },
      "feature-three": {
        label: "Projekt 3",
        text: "Digital Stories\nWeb-Erlebnisse fuer Launches, Cases und persoenliche Marken.",
        styles: { backgroundColor: "#efe0d5", borderRadius: 18 }
      },
      "cta-section": { styles: { backgroundColor: "#211a16" } },
      "cta-title": { text: "Ein Auftritt, der ruhig fuehrt", styles: { color: "#fffaf3" } },
      "cta-text": {
        text: "Ausgewaehlte Arbeiten, klare Prozesse und ein visueller Rahmen fuer die naechste Marke.",
        styles: { color: "#f3dfca" }
      },
      "contact-title": { text: "Projekt anfragen" },
      "contact-email": { text: "studio@mira.example" }
    })
  },
  agency: {
    id: "agency",
    label: "Agency",
    sections: createTemplate(initialSections, {
      "hero-section": { styles: { color: "#ffffff", backgroundColor: "#102033", padding: 76 } },
      "hero-logo": { text: "Signalhaus", styles: { color: "#ffffff", fontSize: 23 } },
      "hero-navigation": {
        text: "Strategie   Kampagnen   Cases",
        styles: { color: "#cbd5e1" }
      },
      "hero-title": {
        text: "Wir bauen Kampagnen, die Nachfrage erzeugen",
        styles: { color: "#ffffff", fontSize: 54 }
      },
      "hero-text": {
        text: "Eine Digitalagentur fuer Positionierung, Performance-Kreativitaet und skalierbare Launch-Systeme.",
        styles: { color: "#cbd5e1", fontSize: 19 }
      },
      "hero-button": {
        text: "Case Study anfragen",
        styles: { color: "#0f172a", backgroundColor: "#38e6b5", borderRadius: 6 }
      },
      "features-section": { label: "Agency Services", styles: { backgroundColor: "#eef2f7", padding: 58 } },
      "feature-one": {
        label: "Service 1",
        text: "Positionierung\nMessaging, Angebote und Funnel-Strategie aus einem Guss.",
        styles: { backgroundColor: "#ffffff", borderRadius: 6 }
      },
      "feature-two": {
        label: "Service 2",
        text: "Creative Ops\nAnzeigen, Landingpages und Tests fuer schnelle Lernzyklen.",
        styles: { backgroundColor: "#ffffff", borderRadius: 6 }
      },
      "feature-three": {
        label: "Service 3",
        text: "Growth Systeme\nDashboards, Experimente und Prozesse fuer planbares Wachstum.",
        styles: { backgroundColor: "#ffffff", borderRadius: 6 }
      },
      "cta-section": { styles: { backgroundColor: "#0f172a" } },
      "pricing-two": { styles: { backgroundColor: "#dcfce7" } },
      "contact-section": { styles: { backgroundColor: "#0f172a" } },
      "contact-email": { text: "hello@signalhaus.example" }
    })
  }
};
