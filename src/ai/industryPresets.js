export const industryOptions = [
  "SaaS",
  "Agency",
  "E-Commerce",
  "Portfolio",
  "Restaurant",
  "Other"
];

export const mainGoalOptions = [
  "Get leads",
  "Sell product",
  "Book appointments",
  "Build trust",
  "Showcase work"
];

export const industryPresets = {
  SaaS: {
    template: "saas",
    defaultName: "InvoiceFlow",
    defaultAudience: "Freelancer",
    defaultDescription: "KI-Buchhaltungssoftware",
    cta: {
      "Get leads": "Kostenlos testen",
      "Sell product": "Kostenlos testen",
      "Book appointments": "Demo buchen",
      "Build trust": "So funktioniert es",
      "Showcase work": "Funktionen ansehen"
    },
    features: [
      ["Automatisierte Workflows", "Reduziere wiederkehrende Verwaltungsarbeit und konzentriere dich auf wichtigere Entscheidungen."],
      ["Gemeinsames Dashboard", "Halte Aufgaben, Kennzahlen und naechste Schritte in einem fokussierten Arbeitsbereich sichtbar."],
      ["Schnelles Onboarding", "Starte mit gefuehrter Einrichtung, sinnvollen Defaults und einfacher Einfuehrung."]
    ],
    testimonials: [
      ["Maya Chen", "Gruenderin", "Das Produkt hat unseren Workflow schon in der ersten Woche klarer gemacht."],
      ["Jonas Weber", "Operations Lead", "Endlich hatten wir einen Ort fuer Entscheidungen, Follow-ups und Reporting."],
      ["Amara Brooks", "Finanzberaterin", "Die Einrichtung war einfach, das Ergebnis wirkte trotzdem sehr professionell."]
    ],
    pricing: [
      ["Starter", "19 EUR / Monat", "Kernfunktionen\nBasis-Support\nSolo-Workflows"],
      ["Professional", "59 EUR / Monat", "Erweiterte Workflows\nTeam-Sitze\nPriorisierter Support"],
      ["Enterprise", "Individuell", "Individuelles Onboarding\nSecurity Review\nDedizierter Erfolgssupport"]
    ]
  },
  Agency: {
    template: "agency",
    defaultName: "Signalhaus",
    defaultAudience: "Growth-Teams",
    defaultDescription: "Kampagnenstrategie und Conversion-Landingpages",
    cta: {
      "Get leads": "Angebot anfragen",
      "Sell product": "Launch planen",
      "Book appointments": "Strategiegespraech buchen",
      "Build trust": "Case Studies ansehen",
      "Showcase work": "Arbeiten ansehen"
    },
    features: [
      ["Schaerfere Positionierung", "Verwandle Strategie, Messaging und Kreativrichtung in eine Seite, die konvertiert."],
      ["Kampagnensysteme", "Verbinde Landingpages, Angebote und Testschleifen fuer wiederholbare Launches."],
      ["Performance Review", "Erkenne, was funktioniert, und verbessere jede Kampagne mit klareren Entscheidungen."]
    ],
    testimonials: [
      ["Nora Singh", "CMO", "Das Team hat aus einer unscharfen Kampagne ein klares Angebot gemacht."],
      ["Leo Martin", "Growth Lead", "Jede Section hatte eine Aufgabe, und die Conversion stieg schnell."],
      ["Elena Park", "Gruenderin", "Es fuehlte sich strategisch, schnell und ungewoehnlich umsetzbar an."]
    ],
    pricing: [
      ["Starter", "Audit", "Landingpage-Review\nMessaging-Notizen\nQuick Wins"],
      ["Professional", "Launch Sprint", "Angebotsstrategie\nLandingpage-System\nExperimentplan"],
      ["Enterprise", "Growth Partner", "Kampagnen-Roadmap\nCreative Operations\nDedizierte Strategie"]
    ]
  },
  "E-Commerce": {
    template: "saas",
    defaultName: "Northline Goods",
    defaultAudience: "Online-Kaeufer",
    defaultDescription: "kuratierte Produkte fuer den Alltag",
    cta: {
      "Get leads": "In die Liste eintragen",
      "Sell product": "Kollektion ansehen",
      "Book appointments": "Beratung buchen",
      "Build trust": "Bewertungen lesen",
      "Showcase work": "Produkte entdecken"
    },
    features: [
      ["Kuratierte Produkte", "Praesentiere Bestseller, Bundles und saisonale Angebote in einer klaren Kaufstrecke."],
      ["Reibungsloser Kaufprozess", "Fuehre Kaeufer mit weniger Ablenkung von Entdeckung zu Entscheidung."],
      ["Bindungsimpulse", "Nutze Angebote, Bewertungen und Erinnerungen, um Kunden zurueckzubringen."]
    ],
    testimonials: [
      ["Mila Torres", "Kundin", "Die Kollektion machte es leicht, genau das Richtige zu finden."],
      ["Sam Carter", "Shop-Inhaber", "Unser Angebot war endlich klar genug, um direkt zu kaufen."],
      ["Iris Novak", "Brand Managerin", "Die Produktstory wurde schaerfer und vertrauenswuerdiger."]
    ],
    pricing: [
      ["Starter", "29 EUR", "Kernprodukte\nBasis-Support\nMonatliche Kampagnen"],
      ["Professional", "79 EUR", "Produkt-Bundles\nAutomationsstrecken\nPriorisierter Support"],
      ["Enterprise", "Individuell", "Multi-Store-Rollout\nIndividuelle Integrationen\nDedizierter Erfolgssupport"]
    ]
  },
  Portfolio: {
    template: "portfolio",
    defaultName: "Mira Studio",
    defaultAudience: "Kreativkunden",
    defaultDescription: "Brand Identity und Editorial Design",
    cta: {
      "Get leads": "Projekt starten",
      "Sell product": "Angebot anfragen",
      "Book appointments": "Beratung buchen",
      "Build trust": "Kundenstimmen lesen",
      "Showcase work": "Arbeiten ansehen"
    },
    features: [
      ["Praegende Arbeiten", "Zeige Projekte mit klarem Kontext, Ergebnissen und einer einpraegsamen Haltung."],
      ["Einfacher Kontakt", "Mache es potenziellen Kunden leicht, den Fit zu verstehen und ein Gespraech zu starten."],
      ["Glaubwuerdiger Beweis", "Kombiniere ausgewaehlte Arbeiten mit Stimmen, Prozessnotizen und Ergebnissen."]
    ],
    testimonials: [
      ["Clara Weiss", "Creative Director", "Die Arbeit wirkte durchdacht, nuetzlich und schoen reduziert."],
      ["Owen Hale", "Startup-Gruender", "Unsere Marke hatte endlich ein System, auf dem wir aufbauen konnten."],
      ["Priya Shah", "Editorial Lead", "Der Prozess war klar, ruhig und sehr praezise."]
    ],
    pricing: [
      ["Starter", "Identity Audit", "Markenreview\nVisuelle Richtung\nRoadmap fuer naechste Schritte"],
      ["Professional", "Brand System", "Kernidentitaet\nDesign-Assets\nLaunch-Support"],
      ["Enterprise", "Creative Partner", "Kampagnendesign\nEditorial Systeme\nLaufende Begleitung"]
    ]
  },
  Restaurant: {
    template: "saas",
    defaultName: "Table & Thyme",
    defaultAudience: "lokale Gaeste",
    defaultDescription: "saisonale Kueche und private Events",
    cta: {
      "Get leads": "Gaesteliste beitreten",
      "Sell product": "Gutschein bestellen",
      "Book appointments": "Tisch reservieren",
      "Build trust": "Gaestestimmen lesen",
      "Showcase work": "Menue ansehen"
    },
    features: [
      ["Menue-Highlights", "Zeige Signature Dishes, saisonale Specials und klare Gruende fuer einen Besuch."],
      ["Reservierungen", "Fuehre Gaeste vom Appetit zur Buchung mit einem direkten Call-to-Action."],
      ["Lokale Atmosphaere", "Vermittle Erlebnis, Gastfreundschaft und die Geschichte hinter dem Tisch."]
    ],
    testimonials: [
      ["Anna Keller", "Stammgast", "Das Essen war warm, besonders und wunderbar abgestimmt."],
      ["Marco Lane", "Eventplaner", "Private Dining war einfach zu planen und grossartig umzusetzen."],
      ["Sofia Brandt", "Food Writer", "Ein durchdachtes Menue mit klarem Gefuehl fuer den Ort."]
    ],
    pricing: [
      ["Starter", "Lunch", "Saisonales Menue\nLokale Zutaten\nReservierungslink"],
      ["Professional", "Dinner", "Signature Menue\nPrivate Events\nPriorisierter Gaestesupport"],
      ["Enterprise", "Events", "Catering\nGruppenbuchungen\nDedizierte Planung"]
    ]
  },
  Other: {
    template: "saas",
    defaultName: "Northstar",
    defaultAudience: "Kunden",
    defaultDescription: "ein fokussiertes Produkt oder Angebot",
    cta: {
      "Get leads": "Loslegen",
      "Sell product": "Jetzt kaufen",
      "Book appointments": "Gespraech buchen",
      "Build trust": "Mehr erfahren",
      "Showcase work": "Entdecken"
    },
    features: [
      ["Klarer Nutzen", "Erklaere, was das Angebot nuetzlich, glaubwuerdig und leicht waehlbar macht."],
      ["Einfacher Weg", "Fuehre Besucher vom ersten Eindruck zum naechsten klaren Schritt."],
      ["Vertrauensbeweise", "Nutze Ergebnisse, Beispiele und FAQs, um Zweifel zu reduzieren."]
    ],
    testimonials: [
      ["Maya Chen", "Kundin", "Das Angebot war klar und leicht umzusetzen."],
      ["Jonas Weber", "Team Lead", "Wir haben den Nutzen in Sekunden verstanden."],
      ["Amara Brooks", "Gruenderin", "Die Seite machte den naechsten Schritt sofort klar."]
    ],
    pricing: [
      ["Starter", "Ab 19 EUR", "Kernangebot\nBasis-Support\nSchnelle Einrichtung"],
      ["Professional", "Ab 59 EUR", "Erweitertes Angebot\nPriorisierter Support\nTeam-Workflows"],
      ["Enterprise", "Individuell", "Massgeschneiderte Einrichtung\nDedizierter Support\nErweiterte Anforderungen"]
    ]
  }
};

export function getIndustryPreset(industry) {
  return industryPresets[industry] ?? industryPresets.Other;
}

export function getGoalCta(industry, mainGoal) {
  const preset = getIndustryPreset(industry);

  return preset.cta[mainGoal] ?? preset.cta["Get leads"] ?? "Loslegen";
}
