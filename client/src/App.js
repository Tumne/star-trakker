import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Connections from './components/Connections';

const App = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:5000/nodes');
      const data = await response.json();
      setNodes(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.list}>
        <Connections connections={nodes} list={nodes} />
      </div>
    </div>
  );
};

export default App;
