/**
 * COMPONENT: ImageButton
 * PURPOSE: Makes images clickable
 * STYLE: styles/components/_image_button.scss
 */

import React from 'react';

export default function ImageButton ({ image, onClick, className }) {
  return (
    <button onClick={onClick} className={`image-button ${className || ''}`}>
      <img src={image} alt='' role='presentation' />
    </button>
  );
}
