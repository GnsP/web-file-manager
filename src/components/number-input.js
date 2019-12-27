import React from 'react';

export default function NumberInput ({ onChange, value, placeholder, min, max }) {
  function onChangeHandler (e) {
    onChange(e.target.value);
  }

  return (
    <input
      type='number'
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className='text-input'
      min={min}
      max={max}
    />
  );
}