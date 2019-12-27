import React from 'react';
import ImageButton from './image-button';
import FSIcon from './fs-icon';

import closeImage from 'static/close.svg';

export default function CreateNewDialogue ({ item, onClose }) {
  return (
    <div className='dialogue'>
      <header>
        <div className='fw pull-right-36'>
          <h3 className='hcenter fc'> {item.type === 'file' ? 'File Info' : 'Folder Info'} </h3>
        </div>
        <ImageButton onClick={onClose} image={closeImage} className='push-right' />
      </header>
      <main>
        <div className='hcenter mt-sm fc'>
          <FSIcon type={item.type} name={item.key} />
        </div>
        <div className='mv-md'>
          <div className='mt-md two-col'>
            <span className='left'>Name:</span>
            <span className='right'>{item.key}</span>
          </div>
          <div className='mt-md two-col'>
            <span className='left'>Size:</span>
            <span className='right'>{item.size}kb</span>
          </div>
          <div className='mt-md two-col'>
            <span className='left'>Creator name:</span>
            <span className='right'>{item.creator}</span>
          </div>
          <div className='mt-md two-col'>
            <span className='left'>Created date:</span>
            <span className='right'>{new Date(item.created).toDateString()}</span>
          </div>
        </div>
      </main>
    </div>
  );
}


