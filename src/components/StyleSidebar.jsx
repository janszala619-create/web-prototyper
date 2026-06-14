function StyleSidebar({ element, hasSections, onChange }) {
  const canEditText = Boolean(element && Object.hasOwn(element, "text"));
  const canEditImage = Boolean(element && Object.hasOwn(element, "image"));

  if (!element) {
    return (
      <aside className="style-sidebar">
        <div className="sidebar-header">
          <h2>{hasSections ? "Keine Auswahl" : "Keine Section"}</h2>
          <code>-</code>
        </div>
        <div className="sidebar-empty">
          <strong>
            {hasSections
              ? "Waehle ein Element in der Preview aus."
              : "Fuege zuerst eine Section hinzu."}
          </strong>
          <span>
            {hasSections
              ? "Doppelklick bearbeitet Texte direkt im Canvas."
              : "Danach erscheinen hier Text-, Bild- und Stiloptionen."}
          </span>
        </div>
      </aside>
    );
  }

  function updateStyle(key, value) {
    onChange({
      styles: {
        [key]: value
      }
    });
  }

  function updateImage(updates) {
    onChange({
      image: {
        ...(element.image ?? {}),
        ...updates
      }
    });
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      updateImage({
        src: String(reader.result),
        alt: file.name
      });
    });
    reader.readAsDataURL(file);
  }

  return (
    <aside className="style-sidebar">
      <div className="sidebar-header">
        <div>
          <p className="app-kicker">Bearbeitet</p>
          <h2>{element.label}</h2>
        </div>
        <code>{element.tag}</code>
      </div>
      <div className="selected-meta">
        <span>{element.id}</span>
      </div>

      <label className="field">
        Text
        <textarea
          value={element.text}
          disabled={!canEditText}
          onChange={(event) => onChange({ text: event.target.value })}
          placeholder="Dieses Element enthaelt keinen direkten Text."
        />
      </label>

      {canEditImage ? (
        <div className="image-field">
          <label className="field">
            Bild
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          {element.image?.src ? (
            <>
              <img
                className="image-preview"
                src={element.image.src}
                alt={element.image.alt || "Uploaded preview"}
              />
              <label className="field">
                Alt-Text
                <input
                  type="text"
                  value={element.image.alt ?? ""}
                  onChange={(event) => updateImage({ alt: event.target.value })}
                />
              </label>
              <button
                className="reset-button"
                type="button"
                onClick={() => updateImage({ src: "", alt: "" })}
              >
                Bild entfernen
              </button>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="color-grid">
        <label className="field">
          Textfarbe
          <input
            type="color"
            value={safeColor(element.styles.color)}
            onChange={(event) => updateStyle("color", event.target.value)}
          />
        </label>
        <label className="field">
          Hintergrund
          <input
            type="color"
            value={safeColor(element.styles.backgroundColor)}
            onChange={(event) =>
              updateStyle("backgroundColor", event.target.value)
            }
          />
        </label>
      </div>

      <RangeField
        label="Padding"
        min="0"
        max="96"
        value={element.styles.padding}
        onChange={(value) => updateStyle("padding", value)}
      />
      <RangeField
        label="Margin"
        min="0"
        max="72"
        value={element.styles.margin}
        onChange={(value) => updateStyle("margin", value)}
      />
      <RangeField
        label="Border-Radius"
        min="0"
        max="48"
        value={element.styles.borderRadius}
        onChange={(value) => updateStyle("borderRadius", value)}
      />
      <RangeField
        label="Font-Size"
        min="10"
        max="72"
        value={element.styles.fontSize}
        onChange={(value) => updateStyle("fontSize", value)}
      />
    </aside>
  );
}

function safeColor(value) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : "#ffffff";
}

function safeNumber(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function RangeField({ label, min, max, value, onChange }) {
  const numericValue = safeNumber(value);

  return (
    <label className="field range-field">
      <span>
        {label} <b>{numericValue}px</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={numericValue}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export default StyleSidebar;
