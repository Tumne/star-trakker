import classnames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Connections.module.scss';
import { parseContentVariables } from '../../utils';

const Connections = ({ connections, onClick }) => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const {
    nodes: { initialNodes },
    variables,
  } = useSelector((state) => state);

  const handleOnClick = async (selectedId) => {
    setSelectedNodeId(selectedId);

    const response = await fetch(`http://localhost:5000/nodes/${selectedId}`);
    const { content, connections: childNodes } = (await response.json())[0];

    setNodes(
      childNodes
        ? childNodes.map((connectionId) =>
            initialNodes.find((o) => o.id === connectionId)
          )
        : []
    );

    onClick(parseContentVariables(content, variables));
  };

  return connections.map(({ id, title }) => (
    <li
      key={id}
      className={classnames(styles.li, selectedNodeId === id && styles.tabOpen)}
    >
      <button className={styles.card} onClick={async () => handleOnClick(id)}>
        <span
          className={classnames(
            styles.chevron,
            selectedNodeId === id && nodes.length && styles.right
          )}
        />
        {title}
      </button>
      {selectedNodeId === id && nodes.length ? (
        <ul className={styles.ul}>
          <Connections connections={nodes} onClick={onClick} />
        </ul>
      ) : null}
    </li>
  ));
};

export default Connections;
