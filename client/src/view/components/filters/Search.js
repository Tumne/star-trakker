import { useDispatch } from 'react-redux';
import { resetSearch, searchNodes } from '../../../state/nodes/nodesSlice';
import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const queryString = e.target.value.trim();
    dispatch(queryString ? searchNodes(queryString) : resetSearch());
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
