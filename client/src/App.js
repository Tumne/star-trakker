import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Connections from './components/Connections';
import { sanitize } from 'dompurify';
import Search from './components/Search';

const App = () => {
  const [variables, setVariables] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [content, setContent] = useState([]);
  const [html, setHtml] = useState([]);

  useEffect(() => {
    (async () => {
      const resNodes = await fetch('http://localhost:5000/nodes');
      const newNodes = await resNodes.json();
      setNodes(newNodes);
      setConnections(newNodes);

      const resVariables = await fetch('http://localhost:5000/variables');
      const newVariables = await resVariables.json();
      setVariables(newVariables);
    })();
  }, []);

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

  return (
    <div className={styles.app}>
      <div className={styles.list}>
        <Search
          content={content}
          setHtml={setHtml}
          setConnections={(value) => setConnections(value || nodes)}
        />
        {connections.length ? (
          <ul className={styles.ul}>
            <Connections
              connections={connections}
              list={nodes}
              onClick={(content) => {
                const parsedContent = content.map((o) => parseVariables(o));
                setHtml(parsedContent);
                setContent(parsedContent);
              }}
            />
          </ul>
        ) : (
          <div>No titles found</div>
        )}
      </div>
      <div className={styles.details}>
        {html.map(({ type, body, url }, index) =>
          type === 'image' ? (
            <img key={index} src={url} alt={url} />
          ) : (
            body && (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: sanitize(body),
                }}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default App;
