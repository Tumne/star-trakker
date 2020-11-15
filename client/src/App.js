import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Header from './view/pages/common/Header';
import Details from './view/pages/details';
import List from './view/pages/list';

const App = () => {
  const [theme, setTheme] = useState('');
  const [connections, setConnections] = useState([]);
  const [content, setContent] = useState([]);
  const [html, setHtml] = useState([]);

  // TODO: Replace with redux
  useEffect(() => {
    (async () => {
      const resNodes = await fetch('http://localhost:5000/nodes');
      const newNodes = await resNodes.json();
      setConnections(newNodes);
    })();
  }, []);

  return (
    <div className={classnames(styles.app, theme && styles[theme])}>
      <div className={styles.twinkling} />
      <List
        content={content}
        connections={connections}
        setHtml={setHtml}
        setConnections={setConnections}
        onClick={(newContent) => {
          setHtml(newContent);
          setContent(newContent);
        }}
      />
      <div className={styles.main}>
        <Header theme={theme} setTheme={setTheme} />
        <Details html={html} />
      </div>
    </div>
  );
};

export default App;
