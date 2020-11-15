import Card from './Card';
import styles from './index.module.scss';

const Details = ({ html }) => {
  return (
    <div className={styles.container}>
      {html.length ? (
        html.map((args, index) => <Card key={index} args={args} />)
      ) : (
        <div className={styles.placeholder}>e</div>
      )}
    </div>
  );
};

export default Details;
