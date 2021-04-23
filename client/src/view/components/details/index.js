import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import styles from './index.module.scss';
import {
  highlightContent,
  parseContentVariables,
} from '../../../utils/contentUtils';

const Details = () => {
  const [details, setDetails] = useState([]);
  const { content, queryString } = useSelector((state) => state.nodes);
  const variables = useSelector((state) => state.variables);

  useEffect(() => {
    const parsedContent = parseContentVariables(content, variables);
    const highlightedContent = highlightContent(parsedContent, queryString);
    setDetails(highlightedContent);
  }, [queryString, content, variables]);

  return (
    <div className={styles.container}>
      {details.length ? (
        details.map((args, index) => <Card key={index} args={args} />)
      ) : (
        <div className={styles.placeholder}>e</div>
      )}
    </div>
  );
};

export default Details;
