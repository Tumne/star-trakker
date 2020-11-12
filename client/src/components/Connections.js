import { Fragment, useState } from 'react';
import classnames from 'classnames';
import styles from './Connections.module.css';

const Connections = ({ connections, list, setContent, setActiveId }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const handleOnClick = async (selectedId) => {
    setNodes([]);
    setSelectedNodeId(selectedId);

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
      <li
        className={classnames(
          styles.li,
          selectedNodeId === id && styles.active
        )}
      >
        <button className={styles.card} onClick={async () => handleOnClick(id)}>
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
