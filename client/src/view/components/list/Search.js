import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchNodes, resetConnections } from '../../../state/nodes/nodesSlice';
import { highlightContent } from '../../utils/contentUtils';
import styles from './Search.module.scss';

const Search = ({ content, setHtml }) => {
  const [searchString, setSearchString] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setHtml(highlightContent(content, searchString));
  }, [searchString, content, setHtml]);

  const handleOnChange = async (e) => {
    const { value } = e.target;
    setSearchString(value);
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
