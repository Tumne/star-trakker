import { useState } from 'react';
import { useSelector } from 'react-redux';
import Connections from './Connections';
import styles from './index.module.scss';
import Search from './Search';

const List = ({ setHtml }) => {
  const [content, setContent] = useState([]);
  const { connections } = useSelector((state) => state.nodes);

  return (
    <div className={styles.list}>
      <Search content={content} setHtml={setHtml} />
      {connections.length ? (
        <ul className={styles.ul}>
          <Connections
            connections={connections}
            onClick={(content) => setContent(content)}
          />
        </ul>
      ) : (
        <div>No titles found</div>
      )}
    </div>
  );
};

export default List;
