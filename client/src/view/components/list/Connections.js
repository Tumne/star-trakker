import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectedNode } from '../../../state/nodes/nodesSlice';
import styles from './Connections.module.scss';

const Connections = ({ nodes }) => {
  // const [connections, setConnections] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const dispatch = useDispatch();
  const { selectedId } = useSelector((state) => state.nodes);

  const handleOnClick = async (id, nodeId) => {
    setSelectedNodeId(id);
    dispatch(fetchSelectedNode(nodeId));
    // const response = await fetch(`http://localhost:5000/nodes/${id}`);
    // const { connections: childNodes } = (await response.json())[0];

    // setConnections(
    //   childNodes
    //     ? childNodes.map((connectionId) => ({
    //         ...initialNodes.find((o) => o.id === connectionId),
    //         nodeId: [nodeId, connectionId].join('.'),
    //       }))
    //     : []
    // );
  };

  return nodes.map(({ id, title, nodeId, connections }) => (
    <li
      key={id}
      className={classnames(styles.li, selectedNodeId === id && styles.tabOpen)}
    >
      <button
        className={classnames(
          styles.card,
          selectedId === nodeId && styles.selected
        )}
        onClick={async () => handleOnClick(id, nodeId)}
      >
        <span
          className={classnames(
            styles.chevron,
            selectedNodeId === id && connections.length && styles.right
          )}
        />
        {title}
      </button>
      {selectedNodeId === id && connections.length ? (
        <ul className={styles.ul}>
          <Connections nodes={connections} />
        </ul>
      ) : null}
    </li>
  ));
};

export default Connections;
