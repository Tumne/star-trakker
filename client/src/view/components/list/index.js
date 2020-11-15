import { useSelector } from 'react-redux';
import Search from '../common/Search';
import Connections from './Connections';
import styles from './index.module.scss';

const List = ({ content, connections, setHtml, setConnections, onClick }) => {
  const { initialNodes } = useSelector((state) => state.nodes);

  return (
    <div className={styles.list}>
      <Search
        content={content}
        setHtml={setHtml}
        setConnections={(value) => setConnections(value || initialNodes)}
      />
      {connections.length ? (
        <ul className={styles.ul}>
          <Connections
            connections={connections}
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
