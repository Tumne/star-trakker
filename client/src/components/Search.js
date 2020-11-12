import { useEffect, useState } from 'react';

const Search = ({ content, onChange }) => {
  const [searchString, setSearchString] = useState();

  useEffect(() => {
    let newHtml = content;
    if (searchString) {
      const normReq = searchString
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .sort((a, b) => b.length - a.length);
      newHtml = content.map(({ body, ...rest }) => ({
        ...rest,
        body: body
          ? body.replace(
              new RegExp(`(${normReq.join('|')})`, 'gi'),
              (match) => '<mark>' + match + '</mark>'
            )
          : null,
      }));
    }
    onChange(newHtml);
  }, [searchString, content, onChange]);

  return (
    <input type="text" onChange={(e) => setSearchString(e.target.value)} />
  );
};

export default Search;
