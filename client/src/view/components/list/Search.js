import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetConnections,
  searchNodes,
  updateDetails,
} from '../../../state/nodes/nodesSlice';
import {
  highlightContent,
  parseContentVariables,
} from '../../utils/contentUtils';
import styles from './Search.module.scss';

const Search = () => {
  const [queryString, setQueryString] = useState();
  const dispatch = useDispatch();
  const content = useSelector((state) => state.nodes.content);
  const variables = useSelector((state) => state.variables);

  useEffect(() => {
    const parsedContent = parseContentVariables(content, variables);
    const details = highlightContent(parsedContent, queryString);
    dispatch(updateDetails(details));
  }, [queryString, content, variables, dispatch]);

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
