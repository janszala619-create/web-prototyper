import { useEffect, useRef, useState } from "react";
import { styleFromElement } from "../utils/style.js";

function EditableElement({
  element,
  as: Tag = "div",
  className = "",
  selected,
  onSelect,
  onTextChange,
  children
}) {
  const elementRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const canEditText = Boolean(onTextChange);
  const hasCustomChildren = children !== undefined;

  useEffect(() => {
    if (!isEditing && elementRef.current && canEditText && !hasCustomChildren) {
      elementRef.current.textContent = element.text;
    }
  }, [canEditText, element.text, hasCustomChildren, isEditing]);

  function handleClick(event) {
    event.stopPropagation();
    onSelect(element.id);
  }

  function handleDoubleClick(event) {
    if (!canEditText) {
      return;
    }

    event.stopPropagation();
    setIsEditing(true);
    requestAnimationFrame(() => {
      elementRef.current?.focus();
      document.getSelection()?.selectAllChildren(elementRef.current);
    });
  }

  function handleInput(event) {
    const text = hasCustomChildren
      ? event.currentTarget.innerText
      : event.currentTarget.textContent;

    onTextChange?.(text);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  const classes = [
    "editable-element",
    className,
    selected ? "is-selected" : "",
    isEditing ? "is-editing" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={elementRef}
      className={classes}
      style={styleFromElement(element)}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onInput={handleInput}
      onBlur={stopEditing}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.currentTarget.blur();
        }
      }}
    >
      {children ?? element.text}
    </Tag>
  );
}

export default EditableElement;
