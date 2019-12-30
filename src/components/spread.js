/**
 * COMPONENT: Spread
 * PURPOSE: Spreads children evenly horizontally.
 * STYLE: styles/components/_spread.scss
 */

import React from 'react';

export default function Spread ({ children }) {
  return (
    <div className='spread'>
      { children }
    </div>
  );
}
