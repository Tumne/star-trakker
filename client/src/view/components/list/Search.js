import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  searchNodes,
  resetConnections,
  updateDetails,
} from '../../../state/nodes/nodesSlice';
import { highlightContent } from '../../utils/contentUtils';
import styles from './Search.module.scss';

const Search = ({ content }) => {
  const [queryString, setQueryString] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const details = highlightContent(content, queryString);
    dispatch(updateDetails(details));
  }, [queryString, content, dispatch]);

  const handleOnChange = async (e) => {
    const { value } = e.target;
    setQueryString(value);
    if (value) {
      dispatch(searchNodes(value));
    } else {
      dispatch(resetConnections());
    }
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
