import { normalizeSectionsForEditor } from "../ai/sectionNormalizer.js";
import { cloneSections, initialSections } from "../data/initialElements.js";

const exportCss = `:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #e8edf4;
}

button {
  font: inherit;
}

.landing-canvas {
  min-height: 100vh;
  overflow: hidden;
  background: #ffffff;
}

.page-section {
  width: 100%;
}

.hero-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 56px;
}

.logo {
  font-weight: 850;
}

.main-nav {
  white-space: pre-wrap;
  font-weight: 750;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: 42px;
  align-items: center;
}

.hero-title {
  max-width: 780px;
  line-height: 1.04;
  font-weight: 850;
}

.hero-text,
.section-text {
  max-width: 680px;
  line-height: 1.65;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  border: 0;
  font-weight: 850;
}

.hero-visual {
  border: 1px solid #dfe5ee;
  box-shadow: 0 24px 70px rgba(23, 32, 51, 0.12);
}

.hero-visual-image {
  display: block;
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: inherit;
}

.browser-bar {
  display: flex;
  gap: 7px;
  margin-bottom: 18px;
}

.browser-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #94a3b8;
}

.browser-dot:nth-child(1) {
  background: #ef6a6a;
}

.browser-dot:nth-child(2) {
  background: #f0b84f;
}

.browser-dot:nth-child(3) {
  background: #38b48b;
}

.visual-grid {
  display: grid;
  gap: 12px;
}

.visual-row {
  min-height: 72px;
  border-radius: 8px;
  background: #d9e8ff;
}

.visual-row:nth-child(2) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  background: transparent;
}

.visual-block {
  min-height: 120px;
  border-radius: 8px;
  background: #1167d8;
}

.visual-block:nth-child(2) {
  background: #34b3a0;
}

.section-title {
  margin-bottom: 24px;
  line-height: 1.14;
  font-weight: 850;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.card-grid.two-up {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.feature-card,
.pricing-card,
.quote-card,
.faq-item {
  border: 1px solid #dfe5ee;
}

.feature-card strong,
.pricing-card strong,
.faq-item strong {
  display: block;
  margin-bottom: 12px;
  font-size: 1.18em;
}

.feature-card span,
.pricing-card span,
.faq-item span,
.quote-card {
  display: block;
  line-height: 1.65;
}

.center-stack {
  display: grid;
  justify-items: center;
  text-align: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.7fr);
  gap: 32px;
  align-items: center;
}

.contact-panel {
  display: grid;
  justify-items: start;
  gap: 18px;
}

.faq-list {
  display: grid;
  gap: 14px;
}

.landing-footer {
  width: 100%;
}

@media (max-width: 760px) {
  .landing-canvas {
    min-height: 0;
  }

  .page-section {
    padding-right: min(24px, 7vw) !important;
    padding-left: min(24px, 7vw) !important;
  }

  .hero-topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-grid,
  .card-grid,
  .card-grid.two-up,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .hero-title,
  .section-title {
    font-size: clamp(28px, 9vw, 40px) !important;
  }

  .hero-button {
    width: 100%;
  }
}`;

function safeNumber(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);

    if (Number.isFinite(parsed)) {
      return Math.max(0, parsed);
    }
  }

  return fallback;
}

function safeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

export function styleToInline(element) {
  const { styles = {} } = element ?? {};

  return [
    `color: ${safeColor(styles.color, "#172033")}`,
    `background-color: ${safeColor(styles.backgroundColor, "transparent")}`,
    `padding: ${safeNumber(styles.padding)}px`,
    `margin: ${safeNumber(styles.margin)}px`,
    `border-radius: ${safeNumber(styles.borderRadius)}px`,
    `font-size: ${safeNumber(styles.fontSize, 16)}px`
  ].join("; ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textMarkup(element, tag, className) {
  if (!element) {
    return "";
  }

  return `<${tag} class="${className}" style="${styleToInline(element)}">${escapeHtml(element.text ?? "")}</${tag}>`;
}

function cardMarkup(element, className) {
  if (!element) {
    return "";
  }

  const [title, ...body] = String(element.text ?? "").split("\n");

  return `<article class="${className}" style="${styleToInline(element)}">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(body.join("\n"))}</span>
    </article>`;
}

function renderHero(section) {
  const { content } = section;
  const visualMarkup = content.visual.image?.src
    ? `<img class="hero-visual-image" src="${escapeHtml(content.visual.image.src)}" alt="${escapeHtml(content.visual.image.alt || "Hero-Bild")}" />`
    : `<div class="browser-bar"><span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span></div>
      <div class="visual-grid">
        <div class="visual-row"></div>
        <div class="visual-row"><div class="visual-block"></div><div class="visual-block"></div></div>
        <div class="visual-row"></div>
      </div>`;

  return `<div class="hero-topbar">
    ${textMarkup(content.logo, "div", "logo")}
    ${textMarkup(content.navigation, "nav", "main-nav")}
  </div>
  <div class="hero-grid">
    <div>
      ${textMarkup(content.title, "h1", "hero-title")}
      ${textMarkup(content.text, "p", "hero-text")}
      ${textMarkup(content.button, "button", "hero-button")}
    </div>
    <div class="hero-visual" style="${styleToInline(content.visual)}">
      ${visualMarkup}
    </div>
  </div>`;
}

function renderSectionBody(section) {
  const { content = {} } = section;

  switch (section.type) {
    case "Hero":
      if (!content.logo || !content.navigation || !content.title || !content.text || !content.button || !content.visual) {
        return "";
      }

      return renderHero(section);
    case "Features":
      return `<div class="card-grid">
    ${(content.cards ?? []).map((item) => cardMarkup(item, "feature-card")).join("\n    ")}
  </div>`;
    case "CTA":
      return `<div class="center-stack">
    ${textMarkup(content.title, "h2", "section-title")}
    ${textMarkup(content.text, "p", "section-text")}
    ${textMarkup(content.button, "button", "hero-button")}
  </div>`;
    case "Testimonials":
      return `${textMarkup(content.title, "h2", "section-title")}
  <div class="card-grid two-up">
    ${(content.quotes ?? []).map((item) => textMarkup(item, "blockquote", "quote-card")).join("\n    ")}
  </div>`;
    case "Pricing":
      return `${textMarkup(content.title, "h2", "section-title")}
  <div class="card-grid">
    ${(content.plans ?? []).map((item) => cardMarkup(item, "pricing-card")).join("\n    ")}
  </div>`;
    case "FAQ":
      return `${textMarkup(content.title, "h2", "section-title")}
  <div class="faq-list">
    ${(content.items ?? []).map((item) => cardMarkup(item, "faq-item")).join("\n    ")}
  </div>`;
    case "Contact":
      return `<div class="contact-grid">
    <div>
      ${textMarkup(content.title, "h2", "section-title")}
      ${textMarkup(content.text, "p", "section-text")}
    </div>
    <div class="contact-panel">
      ${textMarkup(content.email, "p", "contact-email")}
      ${textMarkup(content.button, "button", "hero-button")}
    </div>
  </div>`;
    case "Footer":
      return textMarkup(content.text, "footer", "landing-footer");
    default:
      return "";
  }
}

export function createLandingMarkup(sections) {
  const normalizedSections = normalizeSectionsForEditor(sections, cloneSections(initialSections));

  if (!normalizedSections.length) {
    return `<main class="landing-canvas"></main>`;
  }

  return `<main class="landing-canvas">
  ${normalizedSections
    .map(
      (section) => `<section class="page-section section-${section.type.toLowerCase()}" style="${styleToInline(section)}">
  ${renderSectionBody(section)}
</section>`
    )
    .join("\n\n  ")}
</main>`;
}

export function createHtmlDocument(sections, meta = {}) {
  const title = meta.title || "Exportierte Landingpage";
  const description = meta.description || "Exportierte Landingpage aus dem Web-Prototyper.";

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="generator" content="Web-Prototyper" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <title>${escapeHtml(title)}</title>
    <style>
${exportCss}
    </style>
  </head>
  <body>
${createLandingMarkup(sections)}
  </body>
</html>
`;
}
