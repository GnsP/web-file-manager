// @flow

/**
 * COMPONENT: FSItem
 * PURPOSE: Render a file/folder on explorer, with name and event handlers attached
 * STYLE: styles/components/_file-icon.scss
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import FSIcon from './fs-icon';

type FSItemProps = {
  item: {
    type: string,
    path: string,
    par: string,
    key: string,
  },
  onRightClick: Function,
};

export default function FSItem ({ item, onRightClick }: FSItemProps) {
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
