export const parseContentVariables = (content, variables) => {
  const parseVariables = (item) => {
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

  return content.map((o) => parseVariables(o));
};
