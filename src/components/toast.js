import React from 'react';
import { createPortal } from 'react-dom';

export default function Toast ({ error, message }) {
  const [counter, setCounter] = React.useState(0);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    let key = counter + 1;
    setCounter(key);
    setList([...list, {error, message, key}]);

    window.setTimeout(() => {
      setList(list.filter(x => x.key !== key));
    }, 3000);

  }, [message]);

  const render = (
    <div className='toast-area'>
    {
      list.map(item => <div className={`toast ${item.error ? 'error' : ''}`} key={item.key}>{item.message}</div>)
    }
    </div>
  );

  return createPortal(render, document.getElementById('toast-root'));
}
