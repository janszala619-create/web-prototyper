const sectionTypeLabels = {
  Hero: "Hero",
  Features: "Vorteile",
  CTA: "CTA",
  Testimonials: "Kundenstimmen",
  Pricing: "Preise",
  FAQ: "FAQ",
  Contact: "Kontakt",
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
      text: textElement("footer-text", "Footer Text", "footer", "Northstar  |  Prototyp bereit", {
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
      sectionVariant("Hero", "Startup Hero", "Mutige Launch-Section mit produktnaher Botschaft.", {
        "hero-section": { styles: { backgroundColor: "#eef6ff", padding: 78 } },
        "hero-logo": { text: "Launchpad" },
        "hero-navigation": { text: "Produkt   Roadmap   Kontakt" },
        "hero-title": { text: "Starte deine Idee, bevor der Markt weiterzieht", styles: { fontSize: 56 } },
        "hero-text": {
          text: "Prototypisiere deine Story, validiere dein Angebot und bringe schnell eine klare erste Seite online."
        },
        "hero-button": { text: "Jetzt validieren", styles: { backgroundColor: "#0f6bff" } }
      }),
      sectionVariant("Hero", "SaaS Hero", "Klarer Hero fuer Software-Landingpages.", {
        "hero-section": { styles: { backgroundColor: "#f1f7ff", padding: 72 } },
        "hero-logo": { text: "Northstar" },
        "hero-navigation": { text: "Funktionen   Preise   Demo" },
        "hero-title": { text: "Ein ruhigerer Workflow fuer wachsende Teams" },
        "hero-text": {
          text: "Bringe Planung, Reviews und Launches in einen visuellen Arbeitsbereich, den dein Team wirklich nutzt."
        },
        "hero-button": { text: "Demo buchen" }
      }),
      sectionVariant("Hero", "Agentur Hero", "Kontrastreicher Hero fuer Service-Teams.", {
        "hero-section": {
          styles: { color: "#ffffff", backgroundColor: "#102033", padding: 76 }
        },
        "hero-logo": { text: "Signalhaus", styles: { color: "#ffffff" } },
        "hero-navigation": { text: "Strategie   Kampagnen   Cases", styles: { color: "#cbd5e1" } },
        "hero-title": {
          text: "Kampagnensysteme, die Aufmerksamkeit in Nachfrage verwandeln",
          styles: { color: "#ffffff", fontSize: 54 }
        },
        "hero-text": {
          text: "Positionierung, Kreativkonzepte und Landingpages fuer klarere Launch-Zyklen.",
          styles: { color: "#cbd5e1" }
        },
        "hero-button": {
          text: "Case Study anfragen",
          styles: { color: "#0f172a", backgroundColor: "#38e6b5", borderRadius: 6 }
        }
      })
    ]
  },
  {
    type: "Features",
    label: "Vorteile",
    variants: [
      sectionVariant("Features", "Raster Layout", "Drei ausgewogene Vorteile in einem einfachen Raster.", {
        "features-section": { styles: { backgroundColor: "#ffffff", padding: 56 } },
        "feature-one": { text: "Schneller planen\nVerwandle grobe Seitenideen in editierbare Sections." },
        "feature-two": { text: "Visuell bearbeiten\nPasse Texte, Farben und Abstaende direkt im Canvas an." },
        "feature-three": { text: "Sauber exportieren\nLade einen vollstaendigen Offline-HTML-Prototyp herunter." }
      }),
      sectionVariant("Features", "Karten Layout", "Ruhige Karten fuer Produkt- oder Service-Highlights.", {
        "features-section": { styles: { backgroundColor: "#eef2f7", padding: 62 } },
        "feature-one": { styles: { backgroundColor: "#ffffff", borderRadius: 12 } },
        "feature-two": { styles: { backgroundColor: "#ffffff", borderRadius: 12 } },
        "feature-three": { styles: { backgroundColor: "#ffffff", borderRadius: 12 } }
      }),
      sectionVariant("Features", "Icon Layout", "Feature-Karten mit nummerierten Labels im Text.", {
        "features-section": { styles: { backgroundColor: "#f8fafc", padding: 58 } },
        "feature-one": { text: "01 Schneller Start\nBeginne mit strukturierten Sections statt mit einer leeren Seite." },
        "feature-two": { text: "02 Live Preview\nPruefe Desktop, Tablet und Mobile direkt beim Bearbeiten." },
        "feature-three": { text: "03 Portabler Export\nBehalte alle Styles eingebettet in einer HTML-Datei." }
      })
    ]
  },
  {
    type: "Pricing",
    label: "Preise",
    variants: [
      sectionVariant("Pricing", "Einfache Preise", "Ein klares Angebot mit leichten Zusatzplaenen.", {
        "pricing-title": { text: "Einfache Preise fuer schnelle Prototypen" },
        "pricing-one": { text: "Starter\nKostenlos\nEditor ausprobieren" },
        "pricing-two": { text: "Pro\n29 EUR / Monat\nUnbegrenzt Prototypen exportieren" },
        "pricing-three": { text: "Team\n79 EUR / Monat\nGemeinsam an Landingpages arbeiten" }
      }),
      sectionVariant("Pricing", "Drei Preisstufen", "Klassische SaaS-Preise in drei Spalten.", {
        "pricing-title": { text: "Waehle den passenden Arbeitsbereich" },
        "pricing-one": { text: "Basic\n19 EUR / Monat\nFuer Solo-Builder" },
        "pricing-two": {
          text: "Growth\n59 EUR / Monat\nFuer aktive Teams",
          styles: { backgroundColor: "#f1f7ff" }
        },
        "pricing-three": { text: "Scale\n149 EUR / Monat\nFuer Launch-Systeme" }
      }),
      sectionVariant("Pricing", "Enterprise Preise", "Angebot fuer groessere Teams.", {
        "pricing-title": { text: "Gebaut fuer groessere Launch-Teams" },
        "pricing-one": { text: "Pilot\nIndividuell\nEinen Workflow validieren" },
        "pricing-two": { text: "Business\nIndividuell\nIn Teams ausrollen" },
        "pricing-three": {
          text: "Enterprise\nIndividuell\nSecurity, Support und Onboarding",
          styles: { backgroundColor: "#dcfce7" }
        }
      })
    ]
  },
  {
    type: "Testimonials",
    label: "Kundenstimmen",
    variants: [
      sectionVariant("Testimonials", "Kundenstimmen", "Zwei kurze Vertrauensbeweise von Kunden.", {
        "testimonials-title": { text: "Teams veroeffentlichen klarere Seiten" },
        "testimonial-one": { text: "Wir kamen von vagen Wireframes zu einer Seite, auf die alle reagieren konnten." },
        "testimonial-two": { text: "Der Export gab unserem Entwickler eine saubere Uebergabe mit einem Klick." }
      }),
      sectionVariant("Testimonials", "Founder Stimmen", "Social Proof aus Gruenderperspektive.", {
        "testimonials-section": { styles: { backgroundColor: "#fff7ed" } },
        "testimonials-title": { text: "Gebaut fuer fruehe Entscheidungen" },
        "testimonial-one": { text: "Wir konnten die Positionierung pruefen, bevor Produktionscode entstand." },
        "testimonial-two": { text: "Endlich hatten wir einen Prototyp, der echt genug fuer Diskussionen wirkte." }
      }),
      sectionVariant("Testimonials", "Team Feedback", "Block fuer internes Team-Feedback.", {
        "testimonials-section": { styles: { backgroundColor: "#eef6f4" } },
        "testimonials-title": { text: "Feedback aus dem Launch-Team" },
        "testimonial-one": { text: "Marketing konnte Texte aktualisieren, ohne auf Design warten zu muessen." },
        "testimonial-two": { text: "Product konnte Varianten ueber Breakpoints hinweg sofort vergleichen." }
      })
    ]
  },
  {
    type: "FAQ",
    label: "FAQ",
    variants: [
      sectionVariant("FAQ", "Produkt FAQ", "Allgemeine Produktfragen.", {
        "faq-title": { text: "Produkt FAQ" },
        "faq-one": { text: "Kann ich jede Section bearbeiten?\nJa, Inhalte und Kern-Styles bleiben editierbar." },
        "faq-two": { text: "Braucht der Export einen Server?\nNein, die HTML-Datei funktioniert offline." }
      }),
      sectionVariant("FAQ", "Launch FAQ", "Fragen fuer Launch-Seiten.", {
        "faq-title": { text: "Fragen zum Launch" },
        "faq-one": { text: "Kann ich Templates wechseln?\nJa, Templates bleiben in der Toolbar verfuegbar." },
        "faq-two": { text: "Kann ich Sections neu sortieren?\nJa, jede Section enthaelt Steuerelemente zum Verschieben." }
      }),
      sectionVariant("FAQ", "Support FAQ", "Fragen zu Support und Uebergabe.", {
        "faq-title": { text: "Support FAQ" },
        "faq-one": { text: "Wird meine Arbeit gespeichert?\nJa, der Editor speichert den Stand im Browser." },
        "faq-two": { text: "Koennen Entwickler den Export nutzen?\nJa, Styles und Markup sind in einer Datei eingebettet." }
      })
    ]
  },
  {
    type: "CTA",
    label: "CTA",
    variants: [
      sectionVariant("CTA", "Demo CTA", "Zentrierter Aufruf zur Demo-Buchung.", {
        "cta-title": { text: "Sieh den Prototyp in Aktion" },
        "cta-text": { text: "Erstelle einen klaren Seitenentwurf und teile ihn vor dem naechsten Meeting." },
        "cta-button": { text: "Demo buchen" }
      }),
      sectionVariant("CTA", "Download CTA", "Export-fokussierter CTA.", {
        "cta-section": { styles: { backgroundColor: "#0f172a" } },
        "cta-title": { text: "Exportiere einen sauberen Offline-Prototyp" },
        "cta-text": { text: "Speichere die aktuelle Seite als eigenstaendige HTML-Datei mit eingebettetem CSS." },
        "cta-button": { text: "Jetzt exportieren" }
      }),
      sectionVariant("CTA", "Kontakt CTA", "Service-orientierter CTA.", {
        "cta-section": { styles: { backgroundColor: "#211a16" } },
        "cta-title": { text: "Brauchst du eine schaerfere Landingpage?" },
        "cta-text": { text: "Starte mit einem visuellen Prototyp und schaerfe dein Angebot von dort aus." },
        "cta-button": { text: "Projekt starten" }
      })
    ]
  },
  {
    type: "Contact",
    label: "Kontakt",
    variants: [
      sectionVariant("Contact", "Einfacher Kontakt", "Kontaktblock mit E-Mail.", {
        "contact-title": { text: "Kontakt aufnehmen" },
        "contact-text": { text: "Sende eine Nachricht und wir melden uns mit den naechsten Schritten." },
        "contact-email": { text: "hello@example.com" },
        "contact-button": { text: "Kontakt aufnehmen" }
      }),
      sectionVariant("Contact", "Agentur Kontakt", "Dunkler Kontaktblock fuer Agenturen.", {
        "contact-section": { styles: { backgroundColor: "#0f172a" } },
        "contact-title": { text: "Plane deine naechste Kampagne" },
        "contact-text": { text: "Erzaehle uns, was du launchst und wo die Seite leisten muss." },
        "contact-email": { text: "studio@agency.example" },
        "contact-button": { text: "Briefing senden" }
      }),
      sectionVariant("Contact", "Sales Kontakt", "Kontaktblock fuer Sales-Gespraeche.", {
        "contact-section": { styles: { backgroundColor: "#102033" } },
        "contact-title": { text: "Mit Sales sprechen" },
        "contact-text": { text: "Fuer Teams, die Onboarding, Support und wiederholbare Launch-Workflows brauchen." },
        "contact-email": { text: "sales@example.com" },
        "contact-button": { text: "Preise anfragen" }
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
    label: "Agentur",
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
      "features-section": { label: "Agentur Services", styles: { backgroundColor: "#eef2f7", padding: 58 } },
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
