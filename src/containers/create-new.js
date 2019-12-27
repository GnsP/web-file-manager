import React from 'react';
import { connect } from 'react-redux';
import ImageButton from 'components/image-button';
import Switch from 'components/switch';
import TextInput from 'components/text-input';
import DateInput from 'components/date-input';
import NumberInput from 'components/number-input';
import { createNode } from 'store/actions/fs';

import closeImage from 'static/close.svg';

function CreateNewDialogue ({ onClose, createNode }) {
  const [nodeType, setNodeType] = React.useState('file');
  const [name, setName] = React.useState('');
  const [creator, setCreator] = React.useState('');
  const [size, setSize] = React.useState('');
  const [date, setDate] = React.useState('');
  const [errors, setErrors] = React.useState({});

  function submit () {
    let obj = {
      nodeType,
      name,
      creator,
      size,
      date,
    };
    if (validate(obj)) {
      createNode(obj);
      onClose(true);
    }
  }

  function validate (obj) {
    let err = {};
    if (name.length < 1) err.name = 'Name can not be empty';
    if (name === '.' || name === '..' || name.startsWith('/') || name.endsWith('/'))
      err.name = 'Invalid name';
    if (creator.length < 1) err.creator = 'Creator can not be empty';
    if (nodeType === 'file' && size === '') err.size = 'Size can not be empty';
    try {
      let dateString = new Date(date).toISOString().split('T')[0];
      obj.date = new Date(dateString);
    } catch (e) {
      err.date = 'Invalid Date';
    }
    setErrors(err);
    return Object.values(err).length === 0;
  }

  return (
    <div className='dialogue'>
      <header>
        <div className='fw pull-right-36'>
          <h3 className='hcenter fc'> Create New </h3>
        </div>
        <ImageButton onClick={onClose} image={closeImage} className='push-right' />
      </header>
      <main>
        <div className='hcenter mt-sm fc'>
          <Switch
            name='node-type'
            options={[
              {label: 'File', value: 'file'},
              {label: 'Folder', value: 'directory'}
            ]}
            activeIndex={nodeType==='file' ? 0 : 1}
            onSelect={setNodeType}
          />
        </div>
        <div className='mv-md mh-md'>
          <div className='hcenter mt-sm fw'>
            <TextInput value={name} placeholder={'Name'} onChange={setName} />
            { errors.name && <p className='err-sm'>{errors.name}</p> }
          </div>
          <div className='hcenter mt-sm fw'>
            <TextInput value={creator} placeholder={'Creator'} onChange={setCreator} />
            { errors.creator && <p className='err-sm'>{errors.creator}</p> }
          </div>
          { nodeType === 'file' &&
            <div className='hcenter mt-sm fw'>
              <NumberInput value={size} placeholder={'Size'} onChange={setSize} min={0} />
              { errors.size && <p className='err-sm'>{errors.size}</p> }
            </div>
          }
          <div className='hcenter mt-sm fw'>
            <DateInput value={date} placeholder={'Date'} onChange={setDate} />
            { errors.date && <p className='err-sm'>{errors.date}</p> }
          </div>
          <div className='hcenter mt-sm fw'>
            <button className='btn-primary' onClick={submit}>Create</button>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  nodes: state.view.current,
});

export default connect (mapStateToProps, {createNode}) (CreateNewDialogue);
