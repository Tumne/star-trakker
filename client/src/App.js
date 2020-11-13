import { useEffect, useState } from 'react';
import styles from './App.module.css';
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
    const getData = async () => {
      const response = await fetch('http://localhost:5000/nodes');
      const data = await response.json();
      setNodes(data);
      setConnections(data);
    };
    getData();

    const getVariables = async () => {
      const response = await fetch('http://localhost:5000/variables');
      const data = await response.json();
      setVariables(data);
    };

    getVariables();
  }, []);

  const bracketsToTags = (item) => {
    const { body } = item;
    const source = 'Lorem [ipsum] dolor [sit] amet';
    const reg = /\{(.+?)\}/;

    return (body || source).replace(new RegExp(reg, 'g'), (_, str) => {
      const [id, fallback] = str.split('|');
      const tag = variables.find((v) => v.id === id);
      return tag ? `<span>${tag.name}</span>` : fallback;
    });
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
        {html.map((item, index) => {
          return (
            <p
              key={index}
              dangerouslySetInnerHTML={{
                __html: sanitize(bracketsToTags(item)),
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
