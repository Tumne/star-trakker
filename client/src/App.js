import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Connections from './components/Connections';
import { sanitize } from 'dompurify';
import Search from './components/Search';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [content, setContent] = useState([]);
  const [html, setHtml] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:5000/nodes');
      const data = await response.json();
      setNodes(data);
      setConnections(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.list}>
        <Search
          content={content}
          setHtml={setHtml}
          setConnections={(value) => setConnections(value || nodes)}
        />
        {connections.length ? (
          <Connections
            connections={connections}
            list={nodes}
            setContent={(content) => {
              setHtml(content);
              setContent(content);
            }}
          />
        ) : (
          <div>No titles found</div>
        )}
      </div>
      <div className={styles.details}>
        {html.map(({ body }, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: sanitize(body) }} />
        ))}
      </div>
    </div>
  );
};

export default App;
