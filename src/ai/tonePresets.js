export const toneOptions = ["Modern", "Professional", "Friendly", "Luxury", "Startup"];

export const tonePresets = {
  Modern: {
    primary: "#1167d8",
    secondary: "#34b3a0",
    hero: "#f1f7ff",
    surface: "#ffffff",
    muted: "#f8fafc",
    dark: "#102033",
    text: "#172033",
    softText: "#4c5a68",
    buttonRadius: 8,
    sectionPadding: 72,
    heroFontSize: 54,
    copyStyle: "klar, selbstbewusst und grosszuegig"
  },
  Professional: {
    primary: "#1f4e79",
    secondary: "#64748b",
    hero: "#eef2f7",
    surface: "#ffffff",
    muted: "#f8fafc",
    dark: "#172033",
    text: "#172033",
    softText: "#516174",
    buttonRadius: 6,
    sectionPadding: 64,
    heroFontSize: 50,
    copyStyle: "ruhig, konkret und vertrauenswuerdig"
  },
  Friendly: {
    primary: "#0f8f70",
    secondary: "#f59e0b",
    hero: "#edfdf8",
    surface: "#ffffff",
    muted: "#f8fafc",
    dark: "#0f2f2a",
    text: "#16332f",
    softText: "#4d635e",
    buttonRadius: 12,
    sectionPadding: 68,
    heroFontSize: 50,
    copyStyle: "warm, direkt und nahbar"
  },
  Luxury: {
    primary: "#b68b2d",
    secondary: "#211a16",
    hero: "#111111",
    surface: "#fffaf3",
    muted: "#f5efe3",
    dark: "#111111",
    text: "#211a16",
    softText: "#6c6256",
    buttonRadius: 2,
    sectionPadding: 82,
    heroFontSize: 56,
    copyStyle: "hochwertig, reduziert und elegant"
  },
  Startup: {
    primary: "#6d5dfc",
    secondary: "#00c2a8",
    hero: "#eef6ff",
    surface: "#ffffff",
    muted: "#f5f7ff",
    dark: "#17153b",
    text: "#17153b",
    softText: "#565d78",
    buttonRadius: 999,
    sectionPadding: 78,
    heroFontSize: 56,
    copyStyle: "mutig, dynamisch und handlungsorientiert"
  }
};

export function getTonePreset(tone) {
  return tonePresets[tone] ?? tonePresets.Modern;
}
