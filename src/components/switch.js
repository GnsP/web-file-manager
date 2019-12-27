import React from 'react';

export default function Switch ({ onSelect, name, options, activeIndex }) {
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
