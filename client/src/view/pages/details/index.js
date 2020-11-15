import Card from './Card';
import Header from './Header';
import styles from './index.module.scss';

const Details = ({ theme, setTheme, html }) => {
  return (
    <div className={styles.details}>
      <Header theme={theme} setTheme={setTheme} />
      <div className={styles.content}>
        {html.length ? (
          html.map((args, index) => <Card key={index} args={args} />)
        ) : (
          <div className={styles.placeholder}>e</div>
        )}
      </div>
    </div>
  );
};

export default Details;
