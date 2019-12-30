// @flow

/**
 * COMPONENT: TextInput
 * PURPOSE: Just a controlled component wrapper around <input type='text'>
 * STYLE: styles/components/_inputs.scss
 */

import React from 'react';

type TextInputProps = {
  onChange: Function,
  value: string,
  placeholder: string,
};

export default function TextInput ({ onChange, value, placeholder }: TextInputProps) {
  function onChangeHandler (e) {
    onChange(e.target.value);
  }

  return (
    <input
      type='text'
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className='text-input'
    />
  );
}
