export function styleFromElement(element) {
  const { styles } = element;

  return {
    color: styles.color,
    backgroundColor: styles.backgroundColor,
    padding: `${styles.padding}px`,
    margin: `${styles.margin}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`
  };
}
