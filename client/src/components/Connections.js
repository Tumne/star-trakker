import { Fragment, useState } from 'react';
import classnames from 'classnames';
import styles from './Connections.module.scss';

const Connections = ({ connections, list, onClick }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const handleOnClick = async (selectedId) => {
    setSelectedNodeId(selectedId);

    const response = await fetch(`http://localhost:5000/nodes/${selectedId}`);
    const { content, connections: childNodes } = (await response.json())[0];

    setNodes(
      childNodes
        ? childNodes.map((connectionId) =>
            list.find((o) => o.id === connectionId)
          )
        : []
    );
    onClick(content);
  };

  return connections.map(({ id, title }) => (
    <Fragment key={id}>
      <li className={classnames(styles.li)}>
        <button className={styles.card} onClick={async () => handleOnClick(id)}>
          {title}
        </button>
      </li>
      {selectedNodeId === id && nodes.length ? (
        <ul className={styles.ul}>
          <Connections connections={nodes} list={list} onClick={onClick} />
        </ul>
      ) : null}
    </Fragment>
  ));
};

export default Connections;
