/**
 * COMPONENT: DateInput
 * PURPOSE: Just a controlled component wrapper around <input type='date'>
 * STYLE: styles/components/_inputs.scss
 */

import React from 'react';

export default function DateInput ({ onChange, value, placeholder }) {
  function onChangeHandler (e) {
    onChange(e.target.value);
  }

  return (
    <input
      type='date'
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className='text-input'
    />
  );
}
