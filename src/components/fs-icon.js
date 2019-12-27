import React from 'react';
import fileImage from 'static/file.png';
import folderImage from 'static/folder.png';

export default function FSIcon ({ type, name }) {
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
