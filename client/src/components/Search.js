import { useEffect, useState } from 'react';

const Search = ({ content, setHtml, setConnections }) => {
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
    setHtml(newHtml);
  }, [searchString, content, setHtml]);

  return (
    <input
      type="text"
      onChange={async (e) => {
        const { value } = e.target;
        setSearchString(e.target.value);

        if (value) {
          const response = await fetch('http://localhost:5000/nodes/search', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: e.target.value,
            }),
          });
          setConnections(await response.json());
        } else {
          setConnections(null);
        }
      }}
    />
  );
};

export default Search;
