import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import Details from './view/pages/details';
import List from './view/pages/list';

const App = () => {
  const [theme, setTheme] = useState('');
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [content, setContent] = useState([]);
  const [html, setHtml] = useState([]);
  const variables = useSelector((state) => state.variables);

  useEffect(() => {
    (async () => {
      const resNodes = await fetch('http://localhost:5000/nodes');
      const newNodes = await resNodes.json();
      setNodes(newNodes);
      setConnections(newNodes);
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
      <div className={styles.twinkling} />
      <List
        content={content}
        connections={connections}
        nodes={nodes}
        setHtml={setHtml}
        setConnections={setConnections}
        onClick={(newContent) => {
          const parsedContent = newContent.map((o) => parseVariables(o));
          setHtml(parsedContent);
          setContent(parsedContent);
        }}
      />
      <Details theme={theme} setTheme={setTheme} html={html} />
    </div>
  );
};

export default App;
