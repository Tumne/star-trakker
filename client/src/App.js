import classnames from 'classnames';
import { useState } from 'react';
import styles from './App.module.scss';
import Details from './view/components/details';
import List from './view/components/list';
import Header from './view/layouts/Header';

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
