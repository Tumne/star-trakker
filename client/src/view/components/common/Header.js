import classnames from 'classnames';
import styles from './Header.module.scss';

const Header = ({ theme, setTheme }) => (
  <div className={styles.header}>
    <div className={styles.title}>Star trakker</div>
    <div>
      <button
        className={classnames(theme === '' && styles.active)}
        onClick={() => setTheme('')}
      >
        S
      </button>
      <button
        className={classnames(theme === 'starfleet' && styles.active)}
        onClick={() => setTheme('starfleet')}
      >
        A
      </button>
      <button
        className={classnames(
          styles.klingonButton,
          theme === 'klingon' && styles.active
        )}
        onClick={() => setTheme('klingon')}
      >
        E
      </button>
      <button
        className={classnames(theme === 'vulcan' && styles.active)}
        onClick={() => setTheme('vulcan')}
      >
        K
      </button>
      <button
        className={classnames(theme === 'borg' && styles.active)}
        onClick={() => setTheme('borg')}
      >
        Q
      </button>
    </div>
  </div>
);

export default Header;
