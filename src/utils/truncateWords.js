const truncateWords = (text = "", limit = 10) => {
  if (!text) return "";

  const words = text.trim().split(/\s+/);

  if (words.length <= limit) {
    return text;
  }

  return words.slice(0, limit).join(" ") + "...";
};

export default truncateWords;
