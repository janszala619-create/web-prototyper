function px(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `${value}px`;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);

    if (Number.isFinite(parsed)) {
      return `${parsed}px`;
    }
  }

  return `${fallback}px`;
}

export function styleFromElement(element) {
  const { styles = {} } = element;

  return {
    color: styles.color,
    backgroundColor: styles.backgroundColor,
    padding: px(styles.padding),
    margin: px(styles.margin),
    borderRadius: px(styles.borderRadius),
    fontSize: px(styles.fontSize, 16)
  };
}
