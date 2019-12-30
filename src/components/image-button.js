// @flow

/**
 * COMPONENT: ImageButton
 * PURPOSE: Makes images clickable
 * STYLE: styles/components/_image_button.scss
 */

import React from 'react';

type ImageButtonProps = {
  image: string,
  onClick: Function,
  className?: string,
};

export default function ImageButton ({ image, onClick, className }: ImageButtonProps) {
  return (
    <button onClick={onClick} className={`image-button ${className || ''}`}>
      <img src={image} alt='' role='presentation' />
    </button>
  );
}
