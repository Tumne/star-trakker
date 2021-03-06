import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSelectedNode } from '../../../state/nodes/nodesSlice';
import styles from './Connections.module.scss';

const Connections = ({ nodes }) => {
  const dispatch = useDispatch();
  const { selectedId } = useSelector((state) => state.nodes);

  return nodes.map(({ id, title, nodeId, connections }) => (
    <li
      key={id}
      className={classnames(styles.li, connections?.length && styles.tabOpen)}
    >
      <button
        className={classnames(
          styles.card,
          selectedId === nodeId && styles.selected
        )}
        onClick={() => dispatch(fetchSelectedNode(nodeId))}
      >
        <span
          className={classnames(
            styles.chevron,
            connections
              ? connections?.length && styles.right
              : styles.placeholder
          )}
        />
        {title}
      </button>
      {connections?.length ? (
        <ul className={styles.ul}>
          <Connections nodes={connections} />
        </ul>
      ) : null}
    </li>
  ));
};

Connections.propTypes = {
  nodes: PropTypes.array.isRequired,
};

export default Connections;
