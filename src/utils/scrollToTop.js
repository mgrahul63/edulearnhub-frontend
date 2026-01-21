export const scrollToTop = (behavior = "smooth") => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior });
  }
};
