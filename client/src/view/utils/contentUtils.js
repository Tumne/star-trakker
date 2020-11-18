/**
 * Parses and replaces an array of template strings with variables tags
 * which resemble {<idOfTheVariable>|a fallback value}
 *
 * @param   {array} content
 * @param   {array} variables
 * @return  {array}
 */
export const parseContentVariables = (content, variables) => {
  const replaceVariables = (item) => {
    const reg = /\{(.+?)\}/;
    return {
      ...item,
      body: (item.body || '').replace(new RegExp(reg, 'g'), (_, str) => {
        const [id, fallback] = str.split('|');
        const tag = variables.find((v) => v.id === id);
        return tag ? `<span>${tag.name}</span>` : fallback;
      }),
    };
  };

  return content.map((o) => replaceVariables(o));
};

/**
 * Highlights content based on a search string
 *
 * @param   {array} content
 * @param   {string} searchString
 * @return  {array}
 */
export const highlightContent = (content, searchString) => {
  const regexTags = '(?!([^<])*?>)(?!<script[^>]*?>)(?![^<]*?</script>|$)';

  if (searchString) {
    const normReq = searchString
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .sort((a, b) => b.length - a.length)
      .join('|');

    return content.map(({ body, ...rest }) => {
      return {
        ...rest,
        body: body
          ? `${body} `.replace(
              new RegExp(`(${normReq})${regexTags}`, 'gi'),
              (match) => '<mark>' + match + '</mark>'
            )
          : null,
      };
    });
  }

  return content;
};
