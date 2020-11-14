import { sanitize } from 'dompurify';
import styles from './Card.module.scss';

const Card = ({ args }) => {
  const { type, url, body } = args;
  return (
    <div className={styles.content}>
      {type === 'image' ? (
        <img src={url} alt={url} />
      ) : (
        body && (
          <p
            dangerouslySetInnerHTML={{
              __html: sanitize(body),
            }}
          />
        )
      )}
    </div>
  );
};

export default Card;
