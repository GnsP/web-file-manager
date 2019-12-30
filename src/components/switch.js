// @flow

/**
 * COMPONENT: Switch
 * PURPOSE: Radio button group with preferably 2 options (a binary switch)
 * STYLE: styles/components/_switch.scss
 */

import React from 'react';

type OptionType = {
  value: string,
  label: string,
};

type SwitchProps = {
  onSelect: Function,
  name: string,
  options: Array<OptionType>,
  activeIndex: number
};

export default function Switch ({ onSelect, name, options, activeIndex }: SwitchProps) {
  function onClick (value) {
    return function handler (e) {
      return onSelect(value);
    }
  }

  return (
    <div className='switch-group-wrapper'>
    {
      options.map(({value, label}, index) => {
        const id = `switch-option-${name}-${value}-${index}`;
        return (
          <div className={`switch-button ${index===activeIndex ? 'active' : ''}`} key={index}>
            <input type='radio' name={name} value={value} id={id} onChange={onClick(value)} />
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })
    }
    </div>
  )
}
