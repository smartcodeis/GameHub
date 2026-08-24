export function generateId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
}

export function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

export function debounce(callback, delay = 300) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function truncate(text, length = 30) {
  if (!text) return "";

  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
}

const Utils = {
  generateId,
  clone,
  debounce,
  random,
  shuffle,
  formatDate,
  truncate,
};

export default Utils;