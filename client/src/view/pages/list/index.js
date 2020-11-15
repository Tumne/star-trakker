import styles from './index.module.scss';
import Connections from './Connections';
import Search from '../common/Search';

const List = ({
  content,
  connections,
  nodes,
  setHtml,
  setConnections,
  onClick,
}) => {
  return (
    <div className={styles.list}>
      <Search
        content={content}
        setHtml={setHtml}
        setConnections={(value) => setConnections(value || nodes)}
      />
      {connections.length ? (
        <ul className={styles.ul}>
          <Connections
            connections={connections}
            list={nodes}
            onClick={(content) => onClick(content)}
          />
        </ul>
      ) : (
        <div>No titles found</div>
      )}
    </div>
  );
};

export default List;
