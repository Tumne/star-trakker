import { useSelector } from 'react-redux';
import Card from './Card';
import styles from './index.module.scss';

const Details = () => {
  const details = useSelector((state) => state.nodes.details);

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
