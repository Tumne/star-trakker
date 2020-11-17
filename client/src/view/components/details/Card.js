import { sanitize } from 'dompurify';
import { hasStringLength } from '../../utils/stringUtils';
import styles from './Card.module.scss';

const Card = ({ args: { type, url, body } }) =>
  type === 'image' ? (
    <div className={styles.content}>
      <img src={url} alt={url} />
    </div>
  ) : body && hasStringLength(body) ? (
    <div className={styles.content}>
      <p
        dangerouslySetInnerHTML={{
          __html: sanitize(body),
        }}
      />
    </div>
  ) : null;

export default Card;
