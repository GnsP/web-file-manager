/**
 * COMPONENT: ContextMenu
 * PURPOSE: Display context menu via a portal
 * STYLE: styles/components/_context-menu.scss
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import OutsideClickTracker from 'components/outside-click-tracker';

export default function ContextMenu ({ x, y, item, onClose, onInfo, onDelete }) {
  const openPath = '/' + (item.type === 'file' ? item.par : item.path);
  function onInfoHandler () {
    onClose();
    onInfo(item);
  }

  function onDeleteHandler () {
    onClose();
    onDelete(item);
  }

  const render = (
    <div className='overlay'>
      <div className='context-menu' style={{top: y, left: x}}>
        <OutsideClickTracker onClickOutside={onClose}>
          <div className='context-menu-inner'>
            <ul>
              <li><Link to={openPath}>Open</Link></li>
              <li><a onClick={onInfoHandler}>Get info</a></li>
              <li className='danger' onClick={onDeleteHandler}><a>Delete</a></li>
            </ul>
          </div>
        </OutsideClickTracker>
      </div>
    </div>
  );

  return createPortal(render, document.getElementById('contextmenu-root'));
}
