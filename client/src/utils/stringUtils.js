/**
 * Checks if string stripped of tags exists
 *
 * @param   {string} str
 * @return  {boolean}
 */
export const hasStringLength = (str) =>
  str.replace(/<[^>]*>?/gm, '').trim().length;
