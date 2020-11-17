import { useDispatch } from 'react-redux';
import {
  resetConnections,
  searchNodes,
  setQueryString,
} from '../../../state/nodes/nodesSlice';
import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const handleOnChange = async (e) => {
    const { value } = e.target;
    dispatch(setQueryString(value));
    dispatch(value ? searchNodes(value) : resetConnections());
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search is a dish best served cold..."
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Search;
