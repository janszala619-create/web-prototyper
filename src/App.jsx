import { useMemo, useState } from "react";
import { defaultPage } from "./data.js";
import { createHtmlDocument, styleToInline } from "./exportHtml.js";

const clonePage = (page) => JSON.parse(JSON.stringify(page));
const STORAGE_KEY = "visual-website-prototyper.v1";

function normalizePage(savedPage) {
  const fallback = clonePage(defaultPage);

  if (!savedPage || typeof savedPage !== "object") {
    return fallback;
  }

  return Object.fromEntries(
    Object.entries(fallback).map(([id, element]) => {
      const savedElement = savedPage[id] || {};

      return [
        id,
        {
          ...element,
          ...savedElement,
          styles: {
            ...element.styles,
            ...(savedElement.styles || {})
          }
        }
      ];
    })
  );
}

function loadPage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizePage(JSON.parse(saved)) : clonePage(defaultPage);
  } catch {
    return clonePage(defaultPage);
  }
}

function styleObject(styles) {
  return {
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    padding: `${styles.padding}px`,
    margin: `${styles.margin}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`
  };
}

function App() {
  const [page, setPage] = useState(loadPage);
  const [selectedId, setSelectedId] = useState("heroTitle");
  const selected = page[selectedId] || page.heroTitle;
  const pageMarkup = useMemo(() => createHtmlDocument(page), [page]);

  function updateElement(id, patch) {
    setPage((current) => {
      const next = {
        ...current,
        [id]: {
          ...current[id],
          ...patch,
          styles: patch.styles ? { ...current[id].styles, ...patch.styles } : current[id].styles
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function updateSelected(patch) {
    updateElement(selectedId, patch);
  }

  function resetPage() {
    const next = clonePage(defaultPage);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPage(next);
    setSelectedId("heroTitle");
  }

  function exportPage() {
    const file = new Blob([createHtmlDocument(page)], { type: "text/html" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "landingpage-prototyp.html";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell">
      <Toolbar onExport={exportPage} onReset={resetPage} />
      <main className="workspace">
        <section className="canvas-panel">
          <Canvas page={page} selectedId={selectedId} onSelect={setSelectedId} onUpdate={updateElement} />
        </section>
        <Sidebar selected={selected} onChange={updateSelected} />
      </main>
      <textarea className="export-preview" readOnly value={pageMarkup} aria-label="Export HTML Vorschau" />
    </div>
  );
}

function Toolbar({ onExport, onReset }) {
  return (
    <header className="toolbar">
      <div>
        <div className="product-name">Prototype Studio</div>
        <div className="product-meta">Landingpage Editor</div>
      </div>
      <div className="toolbar-actions">
        <button type="button" className="ghost-button" onClick={onReset}>
          Zuruecksetzen
        </button>
        <button type="button" className="primary-button" onClick={onExport}>
          HTML exportieren
        </button>
      </div>
    </header>
  );
}

function Canvas({ page, selectedId, onSelect, onUpdate }) {
  const selectionProps = (id) => ({
    "data-selected": selectedId === id,
    onClick: (event) => {
      event.stopPropagation();
      onSelect(id);
    }
  });

  return (
    <div className="canvas-wrap" onClick={() => onSelect("hero")}>
      <main className="landing-page">
        <header className="landing-header selectable" style={styleObject(page.header.styles)} {...selectionProps("header")}>
          <EditableText id="logo" as="div" className="logo selectable" page={page} onUpdate={onUpdate} {...selectionProps("logo")} />
          <EditableText id="nav" as="nav" className="nav selectable" page={page} onUpdate={onUpdate} {...selectionProps("nav")} />
        </header>

        <section className="hero selectable" style={styleObject(page.hero.styles)} {...selectionProps("hero")}>
          <div className="hero-copy">
            <EditableText id="heroTitle" as="h1" className="hero-title selectable" page={page} onUpdate={onUpdate} {...selectionProps("heroTitle")} />
            <EditableText id="heroText" as="p" className="hero-text selectable" page={page} onUpdate={onUpdate} {...selectionProps("heroText")} />
            <EditableText id="heroButton" as="button" className="hero-button selectable" page={page} onUpdate={onUpdate} {...selectionProps("heroButton")} />
          </div>
          <VisualCard style={styleObject(page.heroVisual.styles)} selected={selectedId === "heroVisual"} onSelect={() => onSelect("heroVisual")} />
        </section>

        <section className="features selectable" style={styleObject(page.features.styles)} {...selectionProps("features")}>
          {["feature1", "feature2", "feature3"].map((id) => (
            <FeatureCard key={id} id={id} page={page} selected={selectedId === id} onSelect={onSelect} onUpdate={onUpdate} />
          ))}
        </section>

        <EditableText id="footer" as="footer" className="landing-footer selectable" page={page} onUpdate={onUpdate} {...selectionProps("footer")} />
      </main>
    </div>
  );
}

function EditableText({ id, as: Tag, page, onUpdate, ...props }) {
  const item = page[id];

  function commit(event) {
    onUpdate(id, { text: event.currentTarget.textContent });
  }

  return (
    <Tag
      {...props}
      style={styleObject(item.styles)}
      contentEditable
      suppressContentEditableWarning
      onInput={commit}
      onDoubleClick={(event) => {
        event.currentTarget.focus();
        document.execCommand("selectAll", false, null);
      }}
    >
      {item.text}
    </Tag>
  );
}

function FeatureCard({ id, page, selected, onSelect, onUpdate }) {
  const card = page[id];

  return (
    <article
      className="feature-card selectable"
      data-selected={selected}
      style={styleObject(card.styles)}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      <h3
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onUpdate(id, { title: event.currentTarget.textContent })}
        onDoubleClick={(event) => {
          event.currentTarget.focus();
          document.execCommand("selectAll", false, null);
        }}
      >
        {card.title}
      </h3>
      <p
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onUpdate(id, { text: event.currentTarget.textContent })}
        onDoubleClick={(event) => {
          event.currentTarget.focus();
          document.execCommand("selectAll", false, null);
        }}
      >
        {card.text}
      </p>
    </article>
  );
}

function VisualCard({ style, selected, onSelect }) {
  return (
    <div
      className="hero-visual selectable"
      data-selected={selected}
      style={style}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
      </div>
      <div className="visual-grid">
        <div className="visual-row" />
        <div className="visual-row">
          <div className="visual-block" />
          <div className="visual-block" />
        </div>
        <div className="visual-row" />
      </div>
    </div>
  );
}

function Sidebar({ selected, onChange }) {
  const textValue = selected.title ? `${selected.title}\n${selected.text}` : selected.text || "";
  const canEditText = selected.type !== "section" && selected.type !== "header" && selected.type !== "visual";

  function changeText(value) {
    if (selected.title !== undefined) {
      const [title, ...rest] = value.split("\n");
      onChange({ title, text: rest.join("\n") });
    } else {
      onChange({ text: value });
    }
  }

  return (
    <aside className="settings-panel">
      <div className="settings-head">
        <span>{selected.label}</span>
        <code>{selected.type}</code>
      </div>

      <label className="field full-field">
        Text
        <textarea value={textValue} disabled={!canEditText} onChange={(event) => changeText(event.target.value)} />
      </label>

      <div className="color-grid">
        <label className="field">
          Hintergrund
          <input type="color" value={selected.styles.backgroundColor} onChange={(event) => onChange({ styles: { backgroundColor: event.target.value } })} />
        </label>
        <label className="field">
          Textfarbe
          <input type="color" value={selected.styles.color} onChange={(event) => onChange({ styles: { color: event.target.value } })} />
        </label>
      </div>

      <RangeField label="Padding" min="0" max="96" value={selected.styles.padding} onChange={(padding) => onChange({ styles: { padding } })} />
      <RangeField label="Margin" min="0" max="72" value={selected.styles.margin} onChange={(margin) => onChange({ styles: { margin } })} />
      <RangeField label="Border-Radius" min="0" max="40" value={selected.styles.borderRadius} onChange={(borderRadius) => onChange({ styles: { borderRadius } })} />
      <RangeField label="Schriftgroesse" min="10" max="72" value={selected.styles.fontSize} onChange={(fontSize) => onChange({ styles: { fontSize } })} />

      <div className="inline-code">{styleToInline(selected.styles)}</div>
    </aside>
  );
}

function RangeField({ label, min, max, value, onChange }) {
  return (
    <label className="field range-field">
      <span>
        {label} <b>{value}px</b>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export default App;
