export const classNames = (...classes) => {
  return classes.join(" ").split(/\s+/).filter(Boolean).join(" ");
};
