import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = ({ theme, onClick }) => (
  <div className={styles.header}>
    <div className={styles.title}>Star Trakker</div>
    <div>
      <button
        className={classnames(theme === '' && styles.active)}
        onClick={() => onClick('')}
      >
        S
      </button>
      <button
        className={classnames(theme === 'starfleet' && styles.active)}
        onClick={() => onClick('starfleet')}
      >
        A
      </button>
      <button
        className={classnames(
          styles.klingonButton,
          theme === 'klingon' && styles.active
        )}
        onClick={() => onClick('klingon')}
      >
        E
      </button>
      <button
        className={classnames(theme === 'vulcan' && styles.active)}
        onClick={() => onClick('vulcan')}
      >
        K
      </button>
      <button
        className={classnames(theme === 'borg' && styles.active)}
        onClick={() => onClick('borg')}
      >
        Q
      </button>
    </div>
  </div>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.string,
};

Header.defaultProps = {
  theme: '',
};

export default Header;
