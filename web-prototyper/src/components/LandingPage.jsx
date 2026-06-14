import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditableElement from "./EditableElement.jsx";
import { styleFromElement } from "../utils/style.js";

function splitLines(text) {
  const [title, ...body] = text.split("\n");

  return {
    title,
    body: body.join("\n")
  };
}

function containsElementId(value, id) {
  if (!id) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some((item) => containsElementId(item, id));
  }

  if (!value || typeof value !== "object") {
    return false;
  }

  if (value.id === id) {
    return true;
  }

  return Object.values(value).some((child) => containsElementId(child, id));
}

function LandingPage({
  sections,
  selectedId,
  onAddSectionClick,
  onSelect,
  onUpdateElement,
  onDuplicateSection,
  onDeleteSection,
  onMoveSection,
  onReorderSections
}) {
  const [activeDragId, setActiveDragId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 160,
        tolerance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const activeDragSection = sections.find((section) => section.id === activeDragId);

  if (!sections.length) {
    return (
      <div className="landing-canvas empty-canvas">
        <div className="empty-state">
          <p className="app-kicker">Keine Sections</p>
          <h2>Starte mit einer Section aus der Library.</h2>
          <button className="export-button" type="button" onClick={onAddSectionClick}>
            Add Section
          </button>
        </div>
      </div>
    );
  }

  function selectionProps(element) {
    return {
      element,
      selected: selectedId === element.id,
      onSelect
    };
  }

  function editableText(element, props = {}) {
    return (
      <EditableElement
        {...selectionProps(element)}
        {...props}
        onTextChange={(text) => onUpdateElement(element.id, { text })}
      />
    );
  }

  function card(element, className) {
    const { title, body } = splitLines(element.text);

    return (
      <EditableElement
        key={element.id}
        {...selectionProps(element)}
        as="article"
        className={className}
        onTextChange={(text) => onUpdateElement(element.id, { text })}
      >
        <strong>{title}</strong>
        <span>{body}</span>
      </EditableElement>
    );
  }

  function renderHero(section) {
    const { content } = section;

    return (
      <>
        <div className="hero-topbar">
          {editableText(content.logo, { className: "logo" })}
          {editableText(content.navigation, { as: "nav", className: "main-nav" })}
        </div>
        <div className="hero-grid">
          <div>
            {editableText(content.title, { as: "h1", className: "hero-title" })}
            {editableText(content.text, { as: "p", className: "hero-text" })}
            {editableText(content.button, { as: "button", className: "hero-button" })}
          </div>

          <div
            className={`editable-element hero-visual ${
              selectedId === content.visual.id ? "is-selected" : ""
            }`}
            style={styleFromElement(content.visual)}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(content.visual.id);
            }}
          >
            {content.visual.image?.src ? (
              <img
                className="hero-visual-image"
                src={content.visual.image.src}
                alt={content.visual.image.alt || "Hero visual"}
              />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  function renderSectionBody(section) {
    const { content } = section;

    switch (section.type) {
      case "Hero":
        return renderHero(section);
      case "Features":
        return <div className="card-grid">{content.cards.map((item) => card(item, "feature-card"))}</div>;
      case "CTA":
        return (
          <div className="center-stack">
            {editableText(content.title, { as: "h2", className: "section-title" })}
            {editableText(content.text, { as: "p", className: "section-text" })}
            {editableText(content.button, { as: "button", className: "hero-button" })}
          </div>
        );
      case "Testimonials":
        return (
          <>
            {editableText(content.title, { as: "h2", className: "section-title" })}
            <div className="card-grid two-up">
              {content.quotes.map((item) => editableText(item, { key: item.id, as: "blockquote", className: "quote-card" }))}
            </div>
          </>
        );
      case "Pricing":
        return (
          <>
            {editableText(content.title, { as: "h2", className: "section-title" })}
            <div className="card-grid">{content.plans.map((item) => card(item, "pricing-card"))}</div>
          </>
        );
      case "FAQ":
        return (
          <>
            {editableText(content.title, { as: "h2", className: "section-title" })}
            <div className="faq-list">{content.items.map((item) => card(item, "faq-item"))}</div>
          </>
        );
      case "Contact":
        return (
          <div className="contact-grid">
            <div>
              {editableText(content.title, { as: "h2", className: "section-title" })}
              {editableText(content.text, { as: "p", className: "section-text" })}
            </div>
            <div className="contact-panel">
              {editableText(content.email, { as: "p", className: "contact-email" })}
              {editableText(content.button, { as: "button", className: "hero-button" })}
            </div>
          </div>
        );
      case "Footer":
        return editableText(content.text, { as: "footer", className: "landing-footer" });
      default:
        return null;
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveDragId(event.active.id)}
      onDragCancel={() => setActiveDragId(null)}
      onDragEnd={(event) => {
        setActiveDragId(null);

        if (event.over) {
          onReorderSections(event.active.id, event.over.id);
        }
      }}
    >
      <SortableContext
        items={sections.map((section) => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="landing-canvas" onClick={() => onSelect(sections[0]?.id ?? "")}>
          {sections.map((section, index) => (
            <SortableSectionFrame
              key={section.id}
              index={index}
              isSelected={containsElementId(section, selectedId)}
              section={section}
              sectionCount={sections.length}
              selectionProps={selectionProps}
              onDuplicateSection={onDuplicateSection}
              onDeleteSection={onDeleteSection}
              onMoveSection={onMoveSection}
              renderSectionBody={renderSectionBody}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeDragSection ? (
          <div className="drag-overlay">{activeDragSection.type} Section</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function SortableSectionFrame({
  index,
  isSelected,
  section,
  sectionCount,
  selectionProps,
  onDuplicateSection,
  onDeleteSection,
  onMoveSection,
  renderSectionBody
}) {
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });
  const frameStyle = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      className={`section-frame ${isDragging ? "is-dragging" : ""} ${
        isSelected ? "is-selected" : ""
      }`}
      style={frameStyle}
    >
      <div className="section-controls" onClick={(event) => event.stopPropagation()}>
        <button
          ref={setActivatorNodeRef}
          className="drag-handle"
          type="button"
          aria-label={`${section.type} Section ziehen`}
          {...attributes}
          {...listeners}
        >
          Drag
        </button>
        <button type="button" onClick={() => onDuplicateSection(section.id)}>
          Duplicate
        </button>
        <button type="button" onClick={() => onDeleteSection(section.id)}>
          Delete
        </button>
        <button
          type="button"
          onClick={() => onMoveSection(section.id, -1)}
          disabled={index === 0}
        >
          Move Up
        </button>
        <button
          type="button"
          onClick={() => onMoveSection(section.id, 1)}
          disabled={index === sectionCount - 1}
        >
          Move Down
        </button>
      </div>
      <EditableElement
        {...selectionProps(section)}
        as="section"
        className={`page-section section-${section.type.toLowerCase()}`}
      >
        {renderSectionBody(section)}
      </EditableElement>
    </div>
  );
}

export default LandingPage;
