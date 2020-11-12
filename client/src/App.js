import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Connections from './components/Connections';
import { sanitize } from 'dompurify';
import Search from './components/Search';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [content, setContent] = useState([]);
  const [html, setHtml] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:5000/nodes');
      setNodes(await response.json());
    };
    getData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.list}>
        <Search content={content} onChange={setHtml} />
        <Connections
          connections={nodes}
          list={nodes}
          setContent={(content) => {
            setHtml(content);
            setContent(content);
          }}
        />
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
