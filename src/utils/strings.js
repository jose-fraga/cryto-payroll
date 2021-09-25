export const capitalize = (input = '') => {
  return input
    .toLowerCase()
    .replace(/\b[a-z](?=[a-z]{2})/g, (letter) => letter.toUpperCase());
};
