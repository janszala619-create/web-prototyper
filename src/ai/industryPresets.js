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
    defaultAudience: "Freelancers",
    defaultDescription: "AI bookkeeping software",
    cta: {
      "Get leads": "Start Free Trial",
      "Sell product": "Start Free Trial",
      "Book appointments": "Book a Demo",
      "Build trust": "See How It Works",
      "Showcase work": "Explore Features"
    },
    features: [
      ["Automated Workflows", "Remove repetitive admin work and focus on higher-value decisions."],
      ["Shared Dashboard", "Keep tasks, metrics and next steps visible in one focused workspace."],
      ["Fast Onboarding", "Launch with guided setup, useful defaults and simple team adoption."]
    ],
    testimonials: [
      ["Maya Chen", "Founder", "The product made our workflow clearer in the first week."],
      ["Jonas Weber", "Operations Lead", "We finally had one place for decisions, follow-up and reporting."],
      ["Amara Brooks", "Finance Consultant", "The setup felt simple, but the outcome felt serious."]
    ],
    pricing: [
      ["Starter", "19 EUR / Monat", "Core features\nBasic support\nSolo workflows"],
      ["Professional", "59 EUR / Monat", "Advanced workflows\nTeam seats\nPriority support"],
      ["Enterprise", "Custom", "Custom onboarding\nSecurity review\nDedicated success"]
    ]
  },
  Agency: {
    template: "agency",
    defaultName: "Signalhaus",
    defaultAudience: "Growth teams",
    defaultDescription: "campaign strategy and conversion landing pages",
    cta: {
      "Get leads": "Request a Proposal",
      "Sell product": "Plan a Launch",
      "Book appointments": "Book a Strategy Call",
      "Build trust": "View Case Studies",
      "Showcase work": "See Our Work"
    },
    features: [
      ["Sharper Positioning", "Turn strategy, messaging and creative direction into a page that converts."],
      ["Campaign Systems", "Connect landing pages, offers and testing loops for repeatable launches."],
      ["Performance Review", "See what is working and improve each campaign with clearer decisions."]
    ],
    testimonials: [
      ["Nora Singh", "CMO", "The team turned a fuzzy campaign into a focused offer."],
      ["Leo Martin", "Growth Lead", "Every section had a job, and conversion improved quickly."],
      ["Elena Park", "Founder", "It felt strategic, fast and unusually easy to act on."]
    ],
    pricing: [
      ["Starter", "Audit", "Landing page review\nMessaging notes\nQuick wins"],
      ["Professional", "Launch Sprint", "Offer strategy\nLanding page system\nExperiment plan"],
      ["Enterprise", "Growth Partner", "Campaign roadmap\nCreative operations\nDedicated strategy"]
    ]
  },
  "E-Commerce": {
    template: "saas",
    defaultName: "Northline Goods",
    defaultAudience: "Online shoppers",
    defaultDescription: "curated products for everyday routines",
    cta: {
      "Get leads": "Join the List",
      "Sell product": "Shop the Collection",
      "Book appointments": "Book a Styling Call",
      "Build trust": "Read Reviews",
      "Showcase work": "Explore Products"
    },
    features: [
      ["Curated Products", "Present bestsellers, bundles and seasonal offers in a clear buying journey."],
      ["Smooth Buying Flow", "Guide shoppers from discovery to decision with fewer distractions."],
      ["Retention Hooks", "Use offers, reviews and reminders to bring customers back."]
    ],
    testimonials: [
      ["Mila Torres", "Customer", "The collection made it easy to find exactly what I needed."],
      ["Sam Carter", "Store Owner", "Our offer finally felt clear enough to buy from."],
      ["Iris Novak", "Brand Manager", "The product story became sharper and more trustworthy."]
    ],
    pricing: [
      ["Starter", "29 EUR", "Core products\nBasic support\nMonthly campaigns"],
      ["Professional", "79 EUR", "Product bundles\nAutomation flows\nPriority support"],
      ["Enterprise", "Custom", "Multi-store rollout\nCustom integrations\nDedicated success"]
    ]
  },
  Portfolio: {
    template: "portfolio",
    defaultName: "Mira Studio",
    defaultAudience: "Creative clients",
    defaultDescription: "brand identity and editorial design",
    cta: {
      "Get leads": "Start a Project",
      "Sell product": "Request a Quote",
      "Book appointments": "Book a Consultation",
      "Build trust": "Read Client Notes",
      "Showcase work": "View Work"
    },
    features: [
      ["Signature Work", "Showcase projects with clear context, outcomes and a memorable point of view."],
      ["Simple Contact Flow", "Make it easy for potential clients to understand fit and start a conversation."],
      ["Credible Proof", "Pair selected work with testimonials, process notes and measurable results."]
    ],
    testimonials: [
      ["Clara Weiss", "Creative Director", "The work felt considered, useful and beautifully restrained."],
      ["Owen Hale", "Startup Founder", "Our brand finally had a system we could build with."],
      ["Priya Shah", "Editorial Lead", "The process was clear, calm and very sharp."]
    ],
    pricing: [
      ["Starter", "Identity Audit", "Brand review\nVisual direction\nNext-step roadmap"],
      ["Professional", "Brand System", "Core identity\nDesign assets\nLaunch support"],
      ["Enterprise", "Creative Partner", "Campaign design\nEditorial systems\nOngoing direction"]
    ]
  },
  Restaurant: {
    template: "saas",
    defaultName: "Table & Thyme",
    defaultAudience: "Local guests",
    defaultDescription: "seasonal dining and private events",
    cta: {
      "Get leads": "Join the Guest List",
      "Sell product": "Order a Gift Card",
      "Book appointments": "Reserve a Table",
      "Build trust": "Read Guest Stories",
      "Showcase work": "View Menu"
    },
    features: [
      ["Menu Highlights", "Feature signature dishes, seasonal specials and clear reasons to visit."],
      ["Reservations", "Guide guests from appetite to booking with a direct call to action."],
      ["Local Atmosphere", "Communicate the experience, hospitality and story behind the table."]
    ],
    testimonials: [
      ["Anna Keller", "Local Guest", "The meal felt warm, memorable and beautifully paced."],
      ["Marco Lane", "Event Planner", "Private dining was easy to arrange and wonderful to host."],
      ["Sofia Brandt", "Food Writer", "A thoughtful menu with a clear sense of place."]
    ],
    pricing: [
      ["Starter", "Lunch", "Seasonal menu\nLocal ingredients\nReservation link"],
      ["Professional", "Dinner", "Signature menu\nPrivate events\nPriority guest support"],
      ["Enterprise", "Events", "Catering\nGroup bookings\nDedicated planning"]
    ]
  },
  Other: {
    template: "saas",
    defaultName: "Northstar",
    defaultAudience: "Customers",
    defaultDescription: "a focused product or service",
    cta: {
      "Get leads": "Get Started",
      "Sell product": "Buy Now",
      "Book appointments": "Book a Call",
      "Build trust": "Learn More",
      "Showcase work": "Explore"
    },
    features: [
      ["Clear Value", "Explain what makes the offer useful, credible and easy to choose."],
      ["Simple Path", "Guide visitors from first impression to the next clear step."],
      ["Proof Points", "Use outcomes, examples and FAQs to reduce hesitation."]
    ],
    testimonials: [
      ["Maya Chen", "Customer", "The offer felt clear and easy to act on."],
      ["Jonas Weber", "Team Lead", "We understood the value in seconds."],
      ["Amara Brooks", "Founder", "The page made the next step obvious."]
    ],
    pricing: [
      ["Starter", "From 19 EUR", "Core offer\nBasic support\nFast setup"],
      ["Professional", "From 59 EUR", "Expanded offer\nPriority support\nTeam workflows"],
      ["Enterprise", "Custom", "Tailored setup\nDedicated support\nAdvanced needs"]
    ]
  }
};

export function getIndustryPreset(industry) {
  return industryPresets[industry] ?? industryPresets.Other;
}

export function getGoalCta(industry, mainGoal) {
  const preset = getIndustryPreset(industry);

  return preset.cta[mainGoal] ?? preset.cta["Get leads"] ?? "Get Started";
}
