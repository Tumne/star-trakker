import classnames from 'classnames';
import { useState } from 'react';
import Details from '../components/details';
import List from '../components/list';
import styles from './App.module.scss';
import Header from './Header';

const App = () => {
  const [theme, setTheme] = useState('');

  return (
    <div className={classnames(styles.app, theme && styles[theme])}>
      <div className={styles.backgroundEffect} />
      <List />
      <div className={styles.main}>
        <Header theme={theme} onClick={setTheme} />
        <Details />
      </div>
    </div>
  );
};

export default App;
