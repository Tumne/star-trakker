import { sanitize } from 'dompurify';
import styles from './Card.module.scss';
import { hasStringLength } from '../../utils/stringUtils';

const Card = ({ args: { type, url, body } }) =>
  type === 'image' ? (
    <div className={styles.content}>
      <img src={url} alt={url} />
    </div>
  ) : hasStringLength(body) ? (
    <div className={styles.content}>
      <p
        dangerouslySetInnerHTML={{
          __html: sanitize(body),
        }}
      />
    </div>
  ) : null;

export default Card;
