import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Connections from './components/Connections';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [content, setContent] = useState([]);

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
        <Connections
          connections={nodes}
          list={nodes}
          setContent={(content) => setContent(content)}
        />
      </div>
      <div className={styles.details}>
        {content.map(({ body }) => (
          <p>{body}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
