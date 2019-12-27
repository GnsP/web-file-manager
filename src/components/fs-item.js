import React from 'react';
import { useHistory } from 'react-router-dom';
import FSIcon from './fs-icon';

export default function FSItem ({ item, onRightClick }) {
  const history = useHistory();
  const path = '/' + (item.type === 'file' ? item.par : item.path);

  function onRightClickHandler (e) {
    e.preventDefault();
    onRightClick(item, e.clientX, e.clientY);
  }

  function doubleClickHandler (e) {
    e.preventDefault();
    history.push(path);
  }

  return (
    <a onDoubleClick={doubleClickHandler} className='file-item' onContextMenu={onRightClickHandler}>
      <FSIcon type={item.type} name={item.key} />
      <div className='file-name-wrapper'>
        {item.key}
      </div>
    </a>
  );
}
