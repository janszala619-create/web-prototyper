import { createHtmlDocument } from "../utils/exportHtml.js";

function slugify(value) {
  return String(value || "landingpage")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "landingpage";
}

function ExportButton({ projectName, sections, onError, onExport }) {
  function exportHtml() {
    try {
      if (!sections.length) {
        throw new Error("Keine Sections zum Exportieren vorhanden.");
      }

      const date = new Date().toISOString().slice(0, 10);
      const filename = `${slugify(projectName)}-${date}.html`;
      const html = createHtmlDocument(sections, {
        title: projectName || "Exportierte Landingpage",
        description: "Exportierte Landingpage aus dem Web-Prototyper."
      });
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(url);
      onExport?.(filename);
    } catch (error) {
      onError?.(error.message || "Export fehlgeschlagen.");
    }
  }

  return (
    <button
      className="export-button"
      type="button"
      onClick={exportHtml}
      disabled={!sections.length}
    >
      HTML exportieren
    </button>
  );
}

export default ExportButton;
