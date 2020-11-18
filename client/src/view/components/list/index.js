import { useSelector } from 'react-redux';
import Search from '../filters/Search';
import Connections from './Connections';
import styles from './index.module.scss';

const List = () => {
  const { nodes } = useSelector((state) => state.nodes);
  return (
    <div className={styles.list}>
      <Search />
      {nodes.length ? (
        <ul className={styles.ul}>
          <Connections nodes={nodes} />
        </ul>
      ) : (
        <div>No titles found</div>
      )}
    </div>
  );
};

export default List;
