import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import classnames from 'classnames';
import Card from './components/Card';
import Connections from './components/Connections';
import Search from './components/Search';

const App = () => {
  const [variables, setVariables] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [content, setContent] = useState([]);
  const [html, setHtml] = useState([]);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    (async () => {
      const resNodes = await fetch('http://localhost:5000/nodes');
      const newNodes = await resNodes.json();
      setNodes(newNodes);
      setConnections(newNodes);

      const resVariables = await fetch('http://localhost:5000/variables');
      const newVariables = await resVariables.json();
      setVariables(newVariables);
    })();
  }, []);

  const parseVariables = (item) => {
    const reg = /\{(.+?)\}/;
    return {
      ...item,
      body: (item.body || '').replace(new RegExp(reg, 'g'), (_, str) => {
        const [id, fallback] = str.split('|');
        const tag = variables.find((v) => v.id === id);
        return tag ? `<span>${tag.name}</span>` : fallback;
      }),
    };
  };

  return (
    <div className={classnames(styles.app, theme && styles[theme])}>
      <div className={styles.list}>
        <Search
          content={content}
          setHtml={setHtml}
          setConnections={(value) => setConnections(value || nodes)}
        />
        {connections.length ? (
          <ul className={styles.ul}>
            <Connections
              connections={connections}
              list={nodes}
              onClick={(content) => {
                const parsedContent = content.map((o) => parseVariables(o));
                setHtml(parsedContent);
                setContent(parsedContent);
              }}
            />
          </ul>
        ) : (
          <div>No titles found</div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.dingbat}>
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
        {html.map((args, index) => (
          <Card key={index} args={args} />
        ))}
      </div>
    </div>
  );
};

export default App;
