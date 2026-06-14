import { useCallback, useEffect, useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import StyleSidebar from "./components/StyleSidebar.jsx";
import ExportButton from "./components/ExportButton.jsx";
import { generateWebsiteWithAI } from "./ai/generateWebsite.js";
import { improveWebsiteWithAI, improvementGoalOptions } from "./ai/improveWebsite.js";
import { industryOptions, mainGoalOptions } from "./ai/industryPresets.js";
import { normalizeGeneratedWebsite } from "./ai/sectionNormalizer.js";
import { toneOptions } from "./ai/tonePresets.js";
import {
  cloneSections,
  createSection,
  duplicateSection,
  initialSections,
  landingTemplates,
  legacyElementsToSections,
  sectionLibrary
} from "./data/initialElements.js";

const STORAGE_KEY = "web-prototyper-editor-state";
const VIEWPORT_STORAGE_KEY = "web-prototyper-preview-mode";
const PROJECTS_STORAGE_KEY = "web-prototyper-projects";
const LAST_PROJECT_STORAGE_KEY = "web-prototyper-last-project-id";
const defaultSelectedId = "hero-title";
const defaultTemplateId = "saas";
const previewModes = ["desktop", "tablet", "mobile"];

function getTemplateSections(templateId) {
  return landingTemplates[templateId]?.sections ?? landingTemplates[defaultTemplateId].sections;
}

function findEditableInValue(value, id) {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findEditableInValue(item, id);

      if (match) {
        return match;
      }
    }

    return null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  if (value.id === id && value.styles) {
    return value;
  }

  for (const child of Object.values(value)) {
    const match = findEditableInValue(child, id);

    if (match) {
      return match;
    }
  }

  return null;
}

function findEditableById(sections, id) {
  for (const section of sections) {
    const match = findEditableInValue(section, id);

    if (match) {
      return match;
    }
  }

  return null;
}

function getFirstEditableId(sections) {
  return findEditableInValue(sections, defaultSelectedId)?.id ?? sections[0]?.id ?? "";
}

function updateEditableInValue(value, id, updates) {
  if (Array.isArray(value)) {
    return value.map((item) => updateEditableInValue(item, id, updates));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if (value.id === id && value.styles) {
    return {
      ...value,
      ...updates,
      styles: {
        ...value.styles,
        ...(updates.styles ?? {})
      }
    };
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      updateEditableInValue(child, id, updates)
    ])
  );
}

function mergeSections(savedSections, templateId) {
  if (Array.isArray(savedSections)) {
    return normalizeEditorSections(savedSections, templateId);
  }

  return cloneSections(getTemplateSections(templateId));
}

function normalizeEditorSections(sections, templateId) {
  const templateSections = getTemplateSections(templateId);
  const normalizedSections = sections
    .filter((section) => section && typeof section === "object")
    .map((section) => {
      const fallbackSection =
        templateSections.find((item) => item.type === section.type) ??
        initialSections.find((item) => item.type === section.type) ??
        initialSections[0];
      const normalized = normalizeGeneratedWebsite(
        { template: templateId, designSystem: {}, sections: [section] },
        { template: templateId, designSystem: {}, sections: cloneSections([fallbackSection]) }
      ).sections[0];

      return {
        ...normalized,
        id: typeof section.id === "string" && section.id.trim() ? section.id : normalized.id
      };
    });

  return normalizedSections.length ? normalizedSections : cloneSections(templateSections);
}

function createProjectId() {
  return `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadProjects() {
  try {
    const projects = JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY));

    return Array.isArray(projects) ? projects : [];
  } catch {
    return [];
  }
}

function saveProjects(projects) {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function editorStateFromProject(project) {
  const templateId = landingTemplates[project?.template] ? project.template : defaultTemplateId;
  const sections = Array.isArray(project?.sections)
    ? cloneSections(project.sections)
    : cloneSections(getTemplateSections(templateId));

  return {
    sections,
    selectedId: getFirstEditableId(sections),
    templateId
  };
}

function loadEditorState() {
  try {
    const projects = loadProjects();
    const lastProjectId = localStorage.getItem(LAST_PROJECT_STORAGE_KEY);
    const lastProject = projects.find((project) => project.id === lastProjectId);

    if (lastProject) {
      return editorStateFromProject(lastProject);
    }

    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const templateId = landingTemplates[savedState?.templateId]
      ? savedState.templateId
      : defaultTemplateId;
    const sections = savedState?.sections
      ? mergeSections(savedState.sections, templateId)
      : legacyElementsToSections(savedState?.elements);
    const selectedId = findEditableById(sections, savedState?.selectedId)
      ? savedState.selectedId
      : getFirstEditableId(sections);

    return { sections, selectedId, templateId };
  } catch {
    const sections = cloneSections(getTemplateSections(defaultTemplateId));

    return {
      sections,
      selectedId: getFirstEditableId(sections),
      templateId: defaultTemplateId
    };
  }
}

function loadLastProjectId() {
  const projects = loadProjects();
  const lastProjectId = localStorage.getItem(LAST_PROJECT_STORAGE_KEY);

  return projects.some((project) => project.id === lastProjectId) ? lastProjectId : "";
}

function stateSignature(templateId, sections) {
  return JSON.stringify({
    sections,
    template: templateId
  });
}

function App() {
  const [history, setHistory] = useState(() => ({
    past: [],
    present: loadEditorState(),
    future: []
  }));
  const [previewMode, setPreviewMode] = useState(() => {
      const savedMode = localStorage.getItem(VIEWPORT_STORAGE_KEY);

    return previewModes.includes(savedMode) ? savedMode : "desktop";
  });
  const [projects, setProjects] = useState(loadProjects);
  const [currentProjectId, setCurrentProjectId] = useState(loadLastProjectId);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSectionLibraryOpen, setIsSectionLibraryOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isImproveOpen, setIsImproveOpen] = useState(false);
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [activeSectionCategory, setActiveSectionCategory] = useState(sectionLibrary[0].type);
  const [toasts, setToasts] = useState([]);
  const { sections, selectedId, templateId } = history.present;

  const activeProject = projects.find((project) => project.id === currentProjectId);
  const currentProjectName = activeProject?.name ?? "Untitled Project";
  const hasUnsavedChanges = activeProject
    ? stateSignature(templateId, sections) !==
      stateSignature(activeProject.template, activeProject.sections)
    : history.past.length > 0;
  const selectedElement = findEditableById(sections, selectedId);
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const showToast = useCallback((message, type = "success") => {
    const id = `toast-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, 3600);
  }, []);

  const dismissToast = useCallback((toastId) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.present));
    } catch {
      window.setTimeout(() => {
        showToast("Editor-Stand konnte nicht lokal gespeichert werden.", "error");
      }, 0);
    }
  }, [history.present, showToast]);

  useEffect(() => {
    localStorage.setItem(VIEWPORT_STORAGE_KEY, previewMode);
  }, [previewMode]);

  useEffect(() => {
    try {
      saveProjects(projects);
    } catch {
      window.setTimeout(() => {
        showToast("Projektliste konnte nicht lokal gespeichert werden.", "error");
      }, 0);
    }
  }, [projects, showToast]);

  useEffect(() => {
    if (currentProjectId) {
      try {
        localStorage.setItem(LAST_PROJECT_STORAGE_KEY, currentProjectId);
      } catch {
        window.setTimeout(() => {
          showToast("Letztes Projekt konnte nicht gemerkt werden.", "error");
        }, 0);
      }
    } else {
      localStorage.removeItem(LAST_PROJECT_STORAGE_KEY);
    }
  }, [currentProjectId, showToast]);

  useEffect(() => {
    if (!isProjectsOpen) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsProjectsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isProjectsOpen]);

  useEffect(() => {
    if (!isSectionLibraryOpen) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsSectionLibraryOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isSectionLibraryOpen]);

  useEffect(() => {
    if (!isGeneratorOpen) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsGeneratorOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isGeneratorOpen]);

  useEffect(() => {
    if (!isImproveOpen) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsImproveOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isImproveOpen]);

  const undo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.past.length === 0) {
        return currentHistory;
      }

      const previous = currentHistory.past.at(-1);

      return {
        past: currentHistory.past.slice(0, -1),
        present: previous,
        future: [currentHistory.present, ...currentHistory.future]
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.future.length === 0) {
        return currentHistory;
      }

      const [next, ...remainingFuture] = currentHistory.future;

      return {
        past: [...currentHistory.past, currentHistory.present],
        present: next,
        future: remainingFuture
      };
    });
  }, []);

  useEffect(() => {
    function handleKeyboardShortcut(event) {
      const isHistoryShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z";
      const isUndo = isHistoryShortcut && !event.shiftKey;
      const isRedo =
        isHistoryShortcut && event.shiftKey;

      if (!isUndo && !isRedo) {
        return;
      }

      event.preventDefault();

      if (isRedo) {
        redo();
      } else {
        undo();
      }
    }

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, [redo, undo]);

  function commitEditorState(updater) {
    setHistory((currentHistory) => {
      const nextPresent = updater(currentHistory.present);

      if (nextPresent === currentHistory.present) {
        return currentHistory;
      }

      return {
        past: [...currentHistory.past, currentHistory.present],
        present: nextPresent,
        future: []
      };
    });
  }

  function updateElement(id, updates) {
    commitEditorState((currentState) => ({
      ...currentState,
      sections: updateEditableInValue(currentState.sections, id, updates)
    }));
  }

  function selectElement(id) {
    setHistory((currentHistory) => ({
      ...currentHistory,
      present: {
        ...currentHistory.present,
        selectedId: id
      }
    }));
  }

  function updateSelectedElement(updates) {
    if (selectedId) {
      updateElement(selectedId, updates);
    }
  }

  function resetEditorState() {
    const nextSections = cloneSections(getTemplateSections(history.present.templateId));

    commitEditorState((currentState) => ({
      ...currentState,
      sections: nextSections,
      selectedId: getFirstEditableId(nextSections)
    }));
  }

  function addSection(type, variantId) {
    const newSection = createSection(type, variantId);

    commitEditorState((currentState) => ({
      ...currentState,
      sections: [...currentState.sections, newSection],
      selectedId: newSection.id
    }));
    setIsSectionLibraryOpen(false);
    setActiveSectionCategory(type);
  }

  async function generateWebsiteFromInput(generatorInput) {
    const shouldReplace = window.confirm("Current website will be replaced. Continue?");

    if (!shouldReplace) {
      return;
    }

    setIsAiWorking(true);

    try {
      const generatedWebsite = await generateWebsiteWithAI(generatorInput);
      const nextTemplateId = landingTemplates[generatedWebsite.template]
        ? generatedWebsite.template
        : templateId;

      commitEditorState((currentState) => ({
        ...currentState,
        sections: generatedWebsite.sections,
        selectedId: getFirstEditableId(generatedWebsite.sections),
        templateId: nextTemplateId
      }));
      setIsGeneratorOpen(false);
      showToast(`AI website generated: ${generatedWebsite.designSystem?.industry ?? "Website"}`);
    } catch (error) {
      showToast(error.message || "AI website generation failed.", "error");
    } finally {
      setIsAiWorking(false);
    }
  }

  async function improveCurrentWebsite(improvementInput) {
    setIsAiWorking(true);

    try {
      const improvedWebsite = await improveWebsiteWithAI({
        ...improvementInput,
        sections
      });

      commitEditorState((currentState) => ({
        ...currentState,
        sections: improvedWebsite.sections,
        selectedId: findEditableById(improvedWebsite.sections, currentState.selectedId)
          ? currentState.selectedId
          : getFirstEditableId(improvedWebsite.sections)
      }));
      setIsImproveOpen(false);
      showToast(`AI improvements applied: ${improvedWebsite.designSystemSuggestions.improvementGoal}`);
    } catch (error) {
      showToast(error.message || "AI improvement failed.", "error");
    } finally {
      setIsAiWorking(false);
    }
  }

  function replaceEditorState(nextState) {
    setHistory({
      past: [],
      present: nextState,
      future: []
    });
  }

  function createProject() {
    const now = new Date().toISOString();
    const sectionsForProject = cloneSections(getTemplateSections(defaultTemplateId));
    const project = {
      id: createProjectId(),
      name: `Untitled Project ${projects.length + 1}`,
      createdAt: now,
      updatedAt: now,
      template: defaultTemplateId,
      sections: sectionsForProject
    };

    setProjects((currentProjects) => [project, ...currentProjects]);
    setCurrentProjectId(project.id);
    replaceEditorState({
      sections: cloneSections(sectionsForProject),
      selectedId: getFirstEditableId(sectionsForProject),
      templateId: defaultTemplateId
    });
    showToast("Projekt erstellt.");
  }

  function saveCurrentProject() {
    const now = new Date().toISOString();

    if (!currentProjectId) {
      const project = {
        id: createProjectId(),
        name: "Untitled Project",
        createdAt: now,
        updatedAt: now,
        template: templateId,
        sections: cloneSections(sections)
      };

      setProjects((currentProjects) => [project, ...currentProjects]);
      setCurrentProjectId(project.id);
      showToast("Projekt gespeichert.");
      return;
    }

    if (!activeProject) {
      showToast("Aktives Projekt wurde nicht gefunden.", "error");
      return;
    }

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === currentProjectId
          ? {
              ...project,
              updatedAt: now,
              template: templateId,
              sections: cloneSections(sections)
            }
          : project
      )
    );
    showToast("Projekt gespeichert.");
  }

  function renameProject(projectId, name) {
    const nextName = name.trim();

    if (!nextName) {
      return;
    }

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              name: nextName,
              updatedAt: new Date().toISOString()
            }
          : project
      )
    );
  }

  function loadProject(projectId) {
    const project = projects.find((projectItem) => projectItem.id === projectId);

    if (!project) {
      showToast("Projekt wurde nicht gefunden.", "error");
      return;
    }

    setCurrentProjectId(project.id);
    replaceEditorState(editorStateFromProject(project));
    setIsProjectsOpen(false);
    showToast("Projekt geladen.");
  }

  function deleteProject(projectId) {
    const projectToDelete = projects.find((project) => project.id === projectId);

    if (!projectToDelete) {
      showToast("Projekt wurde nicht gefunden.", "error");
      return;
    }

    const shouldDelete = window.confirm(
      `Projekt "${projectToDelete.name}" wirklich loeschen? Diese Aktion kann nicht rueckgaengig gemacht werden.`
    );

    if (!shouldDelete) {
      return;
    }

    const nextProjects = projects.filter((project) => project.id !== projectId);

    setProjects(nextProjects);
    showToast("Projekt geloescht.");

    if (projectId !== currentProjectId) {
      return;
    }

    const nextProject = nextProjects[0];

    if (nextProject) {
      setCurrentProjectId(nextProject.id);
      replaceEditorState(editorStateFromProject(nextProject));
      return;
    }

    const sectionsForDefault = cloneSections(getTemplateSections(defaultTemplateId));

    setCurrentProjectId("");
    replaceEditorState({
      sections: sectionsForDefault,
      selectedId: getFirstEditableId(sectionsForDefault),
      templateId: defaultTemplateId
    });
  }

  function deleteSection(sectionId) {
    const sectionToDelete = sections.find((section) => section.id === sectionId);

    if (!sectionToDelete) {
      showToast("Section wurde nicht gefunden.", "error");
      return;
    }

    const shouldDelete = window.confirm(
      `${sectionToDelete.type} Section wirklich loeschen?`
    );

    if (!shouldDelete) {
      return;
    }

    commitEditorState((currentState) => {
      const sectionIndex = currentState.sections.findIndex((section) => section.id === sectionId);
      const nextSections = currentState.sections.filter((section) => section.id !== sectionId);
      const selectedStillExists = Boolean(findEditableById(nextSections, currentState.selectedId));
      const nextSelectedId = selectedStillExists
        ? currentState.selectedId
        : nextSections[sectionIndex]?.id ?? nextSections[sectionIndex - 1]?.id ?? "";

      return {
        ...currentState,
        sections: nextSections,
        selectedId: nextSelectedId
      };
    });
    showToast("Section geloescht.");
  }

  function cloneSection(sectionId) {
    commitEditorState((currentState) => {
      const sectionIndex = currentState.sections.findIndex((section) => section.id === sectionId);

      if (sectionIndex === -1) {
        return currentState;
      }

      const newSection = duplicateSection(currentState.sections[sectionIndex]);
      const nextSections = [...currentState.sections];

      nextSections.splice(sectionIndex + 1, 0, newSection);

      return {
        ...currentState,
        sections: nextSections,
        selectedId: newSection.id
      };
    });
  }

  function moveSection(sectionId, direction) {
    commitEditorState((currentState) => {
      const sectionIndex = currentState.sections.findIndex((section) => section.id === sectionId);
      const nextIndex = sectionIndex + direction;

      if (
        sectionIndex === -1 ||
        nextIndex < 0 ||
        nextIndex >= currentState.sections.length
      ) {
        return currentState;
      }

      const nextSections = [...currentState.sections];
      const [sectionToMove] = nextSections.splice(sectionIndex, 1);

      nextSections.splice(nextIndex, 0, sectionToMove);

      return {
        ...currentState,
        sections: nextSections
      };
    });
  }

  function reorderSections(activeSectionId, overSectionId) {
    if (!activeSectionId || !overSectionId || activeSectionId === overSectionId) {
      return;
    }

    commitEditorState((currentState) => {
      const activeIndex = currentState.sections.findIndex(
        (section) => section.id === activeSectionId
      );
      const overIndex = currentState.sections.findIndex(
        (section) => section.id === overSectionId
      );

      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
        return currentState;
      }

      const nextSections = [...currentState.sections];
      const [sectionToMove] = nextSections.splice(activeIndex, 1);

      nextSections.splice(overIndex, 0, sectionToMove);

      return {
        ...currentState,
        sections: nextSections
      };
    });
  }

  function changeTemplate(nextTemplateId) {
    if (nextTemplateId === templateId) {
      return;
    }

    const template = landingTemplates[nextTemplateId];

    if (!template) {
      return;
    }

    const shouldOverwrite =
      !hasUnsavedChanges ||
      window.confirm(
        `Zum Template "${template.label}" wechseln? Ungespeicherte Aenderungen werden ueberschrieben.`
      );

    if (!shouldOverwrite) {
      return;
    }

    commitEditorState(() => ({
      sections: cloneSections(template.sections),
      selectedId: getFirstEditableId(template.sections),
      templateId: nextTemplateId
    }));
    showToast(`Template "${template.label}" geladen.`);
  }

  return (
    <div className="app-shell">
      <header className="app-toolbar">
        <div>
          <p className="app-kicker">Visual Builder</p>
          <h1>Web-Prototyper</h1>
          {hasUnsavedChanges ? <span className="dirty-indicator">Ungespeichert</span> : null}
        </div>
        <label className="template-picker">
          Template
          <select
            value={templateId}
            onChange={(event) => changeTemplate(event.target.value)}
          >
            {Object.values(landingTemplates).map((template) => (
              <option key={template.id} value={template.id}>
                {template.label}
              </option>
            ))}
          </select>
        </label>
          <button
            className="history-button"
            type="button"
            onClick={() => setIsSectionLibraryOpen(true)}
          >
          Add Section
        </button>
        <button
          className="history-button"
          type="button"
          onClick={() => setIsProjectsOpen(true)}
        >
          Projects
        </button>
        <button
          className="history-button"
          type="button"
          onClick={() => setIsGeneratorOpen(true)}
        >
          AI Generate Website
        </button>
        <button
          className="history-button"
          type="button"
          onClick={() => setIsImproveOpen(true)}
          disabled={!sections.length}
        >
          AI Improve Website
        </button>
        <div className="viewport-switch" aria-label="Preview Breite">
          {previewModes.map((mode) => (
            <button
              key={mode}
              type="button"
              className={previewMode === mode ? "is-active" : ""}
              aria-pressed={previewMode === mode}
              onClick={() => setPreviewMode(mode)}
            >
              {mode === "desktop" ? "Desktop" : mode === "tablet" ? "Tablet" : "Mobile"}
            </button>
          ))}
        </div>
        <div className="toolbar-actions">
          <button
            className="history-button"
            type="button"
            onClick={undo}
            disabled={!canUndo}
          >
            Undo
          </button>
          <button
            className="history-button"
            type="button"
            onClick={redo}
            disabled={!canRedo}
          >
            Redo
          </button>
          <button
            className="reset-button"
            type="button"
            onClick={resetEditorState}
            disabled={!sections.length}
          >
            Zuruecksetzen
          </button>
          <ExportButton
            projectName={currentProjectName}
            sections={sections}
            onError={(message) => showToast(message, "error")}
            onExport={(filename) => showToast(`Export erstellt: ${filename}`)}
          />
        </div>
      </header>

      <main className="editor-layout">
        <section className="preview-area" aria-label="Live Preview">
          <div className={`preview-frame preview-frame-${previewMode}`}>
            <LandingPage
              sections={sections}
              selectedId={selectedId}
              onAddSectionClick={() => setIsSectionLibraryOpen(true)}
              onSelect={selectElement}
              onUpdateElement={updateElement}
              onDuplicateSection={cloneSection}
              onDeleteSection={deleteSection}
              onMoveSection={moveSection}
              onReorderSections={reorderSections}
            />
          </div>
        </section>

        <StyleSidebar element={selectedElement} hasSections={sections.length > 0} onChange={updateSelectedElement} />
      </main>

      {isSectionLibraryOpen ? (
        <SectionLibraryModal
          activeCategory={activeSectionCategory}
          onCategoryChange={setActiveSectionCategory}
          onClose={() => setIsSectionLibraryOpen(false)}
          onSelectVariant={addSection}
        />
      ) : null}

      {isProjectsOpen ? (
        <ProjectsModal
          currentProjectId={currentProjectId}
          projects={projects}
          onClose={() => setIsProjectsOpen(false)}
          onCreateProject={createProject}
          onDeleteProject={deleteProject}
          onLoadProject={loadProject}
          onRenameProject={renameProject}
          onSaveProject={saveCurrentProject}
        />
      ) : null}

      {isGeneratorOpen ? (
        <AiGenerateWebsiteModal
          onClose={() => setIsGeneratorOpen(false)}
          onGenerate={generateWebsiteFromInput}
          isWorking={isAiWorking}
        />
      ) : null}

      {isImproveOpen ? (
        <AiImproveWebsiteModal
          onClose={() => setIsImproveOpen(false)}
          onImprove={improveCurrentWebsite}
          isWorking={isAiWorking}
        />
      ) : null}

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="toast-viewport" aria-live="polite" aria-label="Benachrichtigungen">
      {toasts.map((toast) => (
        <div className={`toast toast-${toast.type}`} key={toast.id}>
          <span>{toast.message}</span>
          <button type="button" onClick={() => onDismiss(toast.id)} aria-label="Toast schliessen">
            Close
          </button>
        </div>
      ))}
    </div>
  );
}

function AiGenerateWebsiteModal({ isWorking, onClose, onGenerate }) {
  const [formData, setFormData] = useState({
    businessName: "InvoiceFlow",
    industry: "SaaS",
    audience: "Freelancers",
    description: "AI bookkeeping software",
    tone: "Modern",
    mainGoal: "Get leads"
  });

  function updateField(field, value) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value
    }));
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="generator-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="generator-title"
      >
        <div className="modal-header">
          <div>
            <p className="app-kicker">AI Generator</p>
            <h2 id="generator-title">AI Generate Website</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} disabled={isWorking}>
            Close
          </button>
        </div>

        <form
          className="generator-form"
          onSubmit={(event) => {
            event.preventDefault();
            onGenerate(formData);
          }}
        >
          <label className="field">
            Business Name
            <input
              type="text"
              value={formData.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
            />
          </label>
          <label className="field">
            Industry
            <select
              value={formData.industry}
              onChange={(event) => updateField("industry", event.target.value)}
            >
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Target Audience
            <input
              type="text"
              value={formData.audience}
              onChange={(event) => updateField("audience", event.target.value)}
            />
          </label>
          <label className="field">
            Product/Service Description
            <textarea
              value={formData.description}
              onChange={(event) => updateField("description", event.target.value)}
            />
          </label>
          <label className="field">
            Tone
            <select
              value={formData.tone}
              onChange={(event) => updateField("tone", event.target.value)}
            >
              {toneOptions.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Main Goal
            <select
              value={formData.mainGoal}
              onChange={(event) => updateField("mainGoal", event.target.value)}
            >
              {mainGoalOptions.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </label>

          <div className="generator-actions">
            <button className="reset-button" type="button" onClick={onClose} disabled={isWorking}>
              Cancel
            </button>
            <button className="export-button" type="submit" disabled={isWorking}>
              {isWorking ? "Generating..." : "AI Generate Website"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function AiImproveWebsiteModal({ isWorking, onClose, onImprove }) {
  const [formData, setFormData] = useState({
    improvementGoal: "Make copy clearer",
    tone: "Modern",
    additionalInstructions: ""
  });

  function updateField(field, value) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value
    }));
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isWorking) {
          onClose();
        }
      }}
    >
      <section
        className="generator-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="improve-title"
      >
        <div className="modal-header">
          <div>
            <p className="app-kicker">AI Assistant</p>
            <h2 id="improve-title">AI Improve Website</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose} disabled={isWorking}>
            Close
          </button>
        </div>

        <form
          className="generator-form"
          onSubmit={(event) => {
            event.preventDefault();
            onImprove(formData);
          }}
        >
          <label className="field">
            Improvement Goal
            <select
              value={formData.improvementGoal}
              onChange={(event) => updateField("improvementGoal", event.target.value)}
            >
              {improvementGoalOptions.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Tone
            <select
              value={formData.tone}
              onChange={(event) => updateField("tone", event.target.value)}
            >
              {toneOptions.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Additional Instructions
            <textarea
              value={formData.additionalInstructions}
              onChange={(event) => updateField("additionalInstructions", event.target.value)}
              placeholder="Make the hero more direct, simplify pricing copy, strengthen the final CTA."
            />
          </label>

          <div className="generator-actions">
            <button className="reset-button" type="button" onClick={onClose} disabled={isWorking}>
              Cancel
            </button>
            <button className="export-button" type="submit" disabled={isWorking}>
              {isWorking ? "Improving..." : "AI Improve Website"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ProjectsModal({
  currentProjectId,
  projects,
  onClose,
  onCreateProject,
  onDeleteProject,
  onLoadProject,
  onRenameProject,
  onSaveProject
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [renameValues, setRenameValues] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.id, project.name]))
  );
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  function updateRenameValue(projectId, value) {
    setRenameValues((currentRenameValues) => ({
      ...currentRenameValues,
      [projectId]: value
    }));
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="projects-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-title"
      >
        <div className="modal-header">
          <div>
            <p className="app-kicker">Project Manager</p>
            <h2 id="projects-title">Projects</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="projects-toolbar">
          <label className="field">
            Search
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search projects"
            />
          </label>
          <div className="projects-toolbar-actions">
            <button className="history-button" type="button" onClick={onCreateProject}>
              Create Project
            </button>
            <button className="export-button" type="button" onClick={onSaveProject}>
              Save Project
            </button>
          </div>
        </div>

        <div className="project-list">
          {projects.length === 0 ? (
            <div className="empty-projects">
              <strong>No projects yet.</strong>
              <span>Create a project or save the current page to start.</span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-projects">
              <strong>No matching projects.</strong>
              <span>Try a different search term.</span>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <article
                className={`project-row ${
                  project.id === currentProjectId ? "is-active" : ""
                }`}
                key={project.id}
              >
                <div className="project-main">
                  <input
                    aria-label="Project name"
                    value={renameValues[project.id] ?? project.name}
                    onChange={(event) => updateRenameValue(project.id, event.target.value)}
                    onBlur={() =>
                      onRenameProject(project.id, renameValues[project.id] ?? project.name)
                    }
                  />
                  <small>
                    Updated {new Date(project.updatedAt).toLocaleDateString()} ·{" "}
                    {project.sections.length} sections
                  </small>
                </div>
                <div className="project-actions">
                  <button
                    className="history-button"
                    type="button"
                    onClick={() =>
                      onRenameProject(project.id, renameValues[project.id] ?? project.name)
                    }
                    disabled={!String(renameValues[project.id] ?? project.name).trim()}
                  >
                    Rename
                  </button>
                  <button
                    className="history-button"
                    type="button"
                    onClick={() => onLoadProject(project.id)}
                    disabled={project.id === currentProjectId}
                  >
                    Load
                  </button>
                  <button
                    className="reset-button"
                    type="button"
                    onClick={() => onDeleteProject(project.id)}
                  >
                    Delete Project
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function SectionLibraryModal({
  activeCategory,
  onCategoryChange,
  onClose,
  onSelectVariant
}) {
  const activeGroup =
    sectionLibrary.find((group) => group.type === activeCategory) ?? sectionLibrary[0];

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="section-library-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="section-library-title"
      >
        <div className="modal-header">
          <div>
            <p className="app-kicker">Section Library</p>
            <h2 id="section-library-title">Add Section</h2>
          </div>
          <button className="modal-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="library-layout">
          <nav className="library-tabs" aria-label="Section Kategorien">
            {sectionLibrary.map((group) => (
              <button
                key={group.type}
                type="button"
                className={group.type === activeGroup.type ? "is-active" : ""}
                onClick={() => onCategoryChange(group.type)}
              >
                {group.label}
              </button>
            ))}
          </nav>

          <div className="variant-grid">
            {activeGroup.variants.map((variant) => (
              <button
                className="variant-card"
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant(activeGroup.type, variant.id)}
              >
                <span className="variant-preview" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <strong>{variant.name}</strong>
                <small>{variant.description}</small>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
