import { useEffect, useState } from 'react';
import styles from './Search.module.scss';

const Search = ({ content, setHtml, setConnections }) => {
  const [searchString, setSearchString] = useState();

  useEffect(() => {
    let newHtml = content;
    const regexTags = '(?!([^<])*?>)(?!<script[^>]*?>)(?![^<]*?</script>|$)';

    if (searchString) {
      const normReq = searchString
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .sort((a, b) => b.length - a.length)
        .join('|');

      newHtml = content.map(({ body, ...rest }) => {
        return {
          ...rest,
          body: body
            ? body.replace(
                new RegExp(`(${normReq})${regexTags}`, 'gi'),
                (match) => '<mark>' + match + '</mark>'
              )
            : null,
        };
      });
    }
    setHtml(newHtml);
  }, [searchString, content, setHtml]);

  const fetchSearch = async (value) => {
    if (value) {
      const response = await fetch('http://localhost:5000/nodes/search', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: value,
        }),
      });
      setConnections(await response.json());
    } else {
      setConnections(null);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        onChange={async (e) => {
          const { value } = e.target;
          setSearchString(value);
          fetchSearch(value);
        }}
      />
    </div>
  );
};

export default Search;
