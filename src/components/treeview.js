/**
 * COMPONENT: TreeView
 * PURPOSE: Display a nested tree structure as an nested collapsible list
 * STYLE: styles/components/_tree-view.scss
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Spread from './spread';
import dropdownImage from 'static/dropdown.svg';

export default function Treeview ({ tree }) {
  const [open, setOpen] = React.useState(false);
  function toggleOpen () {
    setOpen(!open);
  }

  if (tree.type === 'file') {
    return <Link to={'/' + tree.par.join('/')} className='lighter'>{tree.name}</Link>;
  }

  let contents = Object.values(tree.contents);
  contents = contents.filter(node => node.type !== 'file').concat(contents.filter(node => node.type === 'file'));

  return (
    <div className='treeview-container'>
      <Spread>
        <Link to={'/' + tree.path.join('/')} className={tree.isRoot ? 'root-label' : ''}>
          {tree.isRoot ? 'ROOT' : tree.name}
        </Link>
        { !tree.isRoot && <DropdownButton onClick={toggleOpen} active={open} /> }
      </Spread>
      <ul className={`${(open || tree.isRoot) ? 'open' : 'close'} ${tree.isRoot ? 'no-padding' : ''}`}>
      {
        contents.map((node, index) => <li key={index}>
          <Treeview tree={node} />
        </li>)
      }
      </ul>
    </div>
  );
}

function DropdownButton ({ active, onClick }) {
  return (
    <button onClick={onClick} className={`dropdown-button ${active ? 'up' : 'down'}`}>
      <img src={dropdownImage} alt='' role='presentation'/>
    </button>
  );
}
