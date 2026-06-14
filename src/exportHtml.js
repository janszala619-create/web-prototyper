const exportCss = `:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #eef2f6;
}

.landing-page {
  min-height: 100vh;
  background: #ffffff;
  color: #172033;
}

.landing-header,
.landing-footer,
.hero,
.features {
  width: 100%;
}

.landing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid #dfe5ee;
}

.logo {
  font-weight: 800;
}

.nav {
  white-space: pre;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
  gap: 42px;
  align-items: center;
}

.hero-title {
  max-width: 760px;
  line-height: 1.04;
  font-weight: 850;
}

.hero-text {
  max-width: 680px;
  line-height: 1.65;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  font-weight: 800;
}

.hero-visual {
  border: 1px solid #dfe5ee;
  box-shadow: 0 24px 70px rgba(23, 32, 51, 0.12);
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

.features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.feature-card {
  border: 1px solid #dfe5ee;
}

.feature-card h3 {
  margin: 0 0 12px;
  font-size: 1.22em;
}

.feature-card p {
  margin: 0;
  line-height: 1.65;
}

@media (max-width: 760px) {
  .landing-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero,
  .features {
    grid-template-columns: 1fr;
  }
}`;

const cssValue = (value) => `${Number(value) || 0}px`;

export function styleToInline(styles) {
  return [
    `background-color: ${styles.backgroundColor}`,
    `color: ${styles.color}`,
    `padding: ${cssValue(styles.padding)}`,
    `margin: ${cssValue(styles.margin)}`,
    `border-radius: ${cssValue(styles.borderRadius)}`,
    `font-size: ${cssValue(styles.fontSize)}`
  ].join("; ");
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export function createLandingMarkup(page) {
  return `<main class="landing-page">
  <header class="landing-header" style="${styleToInline(page.header.styles)}">
    <div class="logo" style="${styleToInline(page.logo.styles)}">${escapeHtml(page.logo.text)}</div>
    <nav class="nav" style="${styleToInline(page.nav.styles)}">${escapeHtml(page.nav.text)}</nav>
  </header>
  <section class="hero" style="${styleToInline(page.hero.styles)}">
    <div>
      <h1 class="hero-title" style="${styleToInline(page.heroTitle.styles)}">${escapeHtml(page.heroTitle.text)}</h1>
      <p class="hero-text" style="${styleToInline(page.heroText.styles)}">${escapeHtml(page.heroText.text)}</p>
      <button class="hero-button" style="${styleToInline(page.heroButton.styles)}">${escapeHtml(page.heroButton.text)}</button>
    </div>
    <div class="hero-visual" style="${styleToInline(page.heroVisual.styles)}">
      <div class="browser-bar"><span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span></div>
      <div class="visual-grid">
        <div class="visual-row"></div>
        <div class="visual-row"><div class="visual-block"></div><div class="visual-block"></div></div>
        <div class="visual-row"></div>
      </div>
    </div>
  </section>
  <section class="features" style="${styleToInline(page.features.styles)}">
    ${["feature1", "feature2", "feature3"]
      .map(
        (key) => `<article class="feature-card" style="${styleToInline(page[key].styles)}">
      <h3>${escapeHtml(page[key].title)}</h3>
      <p>${escapeHtml(page[key].text)}</p>
    </article>`
      )
      .join("\n    ")}
  </section>
  <footer class="landing-footer" style="${styleToInline(page.footer.styles)}">${escapeHtml(page.footer.text)}</footer>
</main>`;
}

export function createHtmlDocument(page) {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exportierte Landingpage</title>
    <style>
${exportCss}
    </style>
  </head>
  <body>
${createLandingMarkup(page)}
  </body>
</html>
`;
}
