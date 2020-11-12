import { Fragment, useState } from 'react';
import styles from './Connections.module.css';

const Connections = ({ connections, list, setContent }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const getData = async (selectedId) => {
    const response = await fetch(`http://localhost:5000/nodes/${selectedId}`);
    const data = (await response.json())[0];
    setContent(data.content);
    const resData = data.connections;
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
            setNodes([]);
            if (selectedNodeId === id) {
              setSelectedNodeId('');
            } else {
              setSelectedNodeId(id);
              getData(id);
            }
          }}
        >
          {title}
        </button>
      </li>
      {selectedNodeId === id && nodes.length ? (
        <ul>
          <Connections
            connections={nodes}
            list={list}
            setContent={setContent}
          />
        </ul>
      ) : null}
    </Fragment>
  ));
};

export default Connections;
