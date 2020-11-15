import { sanitize } from 'dompurify';
import styles from './Card.module.scss';

const Card = ({ args }) => {
  const { type, url, body } = args;
  return type === 'image' ? (
    <div className={styles.content}>
      <img src={url} alt={url} />
    </div>
  ) : (
    body && (
      <div className={styles.content}>
        <p
          dangerouslySetInnerHTML={{
            __html: sanitize(body),
          }}
        />
      </div>
    )
  );
};

export default Card;
