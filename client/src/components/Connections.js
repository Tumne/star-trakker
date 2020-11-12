import { Fragment, useState } from 'react';
import styles from './Connections.module.css';

const Connections = ({ connections, list }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const getData = async (selectedId) => {
    const response = await fetch(`http://localhost:5000/nodes/${selectedId}`);
    const data = await response.json();
    const resData = data[0].connections;
    setNodes(
      resData
        ? resData.map((connectionId) => list.find((o) => o.id === connectionId))
        : []
    );
  };

  return connections.map(({ id, title }) => (
    <Fragment key={id}>
      <li className={styles.li}>
        <button
          className={styles.card}
          onClick={async () => {
            setSelectedNodeId(selectedNodeId === id ? '' : id);
            getData(id);
          }}
        >
          {title}
        </button>
      </li>
      {selectedNodeId === id && nodes.length ? (
        <ul>
          <Connections connections={nodes} list={list} />
        </ul>
      ) : null}
    </Fragment>
  ));
};

export default Connections;
