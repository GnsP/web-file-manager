/**
 * COMPONENT: Modal
 * PURPOSE: Creates a portal to render modals
 * STYLE: styles/components/_modal.scss
 */

import React from 'react';
import { createPortal } from 'react-dom';

export default function Modal ({ children }) {
  const render = (
    <div className='overlay'>
      { children }
    </div>
  );

  return createPortal(render, document.getElementById('modal-root'));
}
