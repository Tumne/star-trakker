export const hasStringLength = (str) =>
  str.replace(/<[^>]*>?/gm, '').trim().length;
