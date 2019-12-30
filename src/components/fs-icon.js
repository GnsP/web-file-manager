// @flow

/**
 * COMPONENT: FSIcon
 * PURPOSE: Render a file or folder icon with the file extension
 * STYLE: styles/components/_file-icon.scss
 */

import React from 'react';
import fileImage from 'static/file.png';
import folderImage from 'static/folder.png';

type FSIconProps = {
  type: string,
  name: string,
};

export default function FSIcon ({ type, name }: FSIconProps) {
  let ext = null;
  if (type === 'file') {
    let parts = name.split('.');
    ext = parts[parts.length-1] || null;
  }

  return (
    <div className='file-icon-wrapper'>
      <img src={type === 'file' ? fileImage : folderImage} alt={`${type}:${name}`} />
      { ext && <span className='file-ext'>.{ext}</span> }
    </div>
  );
}
