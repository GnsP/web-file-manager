import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spread from 'components/spread';
import { setSearch } from 'store/actions/ui';
import { interleave } from 'utils/index.js';

import arrowImage from 'static/arrow.png';
import searchImage from 'static/search.svg';

function Header ({ cwd, search, setSearch }) {
  React.useEffect(() => {
    setSearch('');
  }, [cwd, setSearch]);

  let par;
  if (cwd.length > 1) par = '/' + cwd.slice(0, cwd.length-1).join('/');
  else par = '/root';

  function onSearchChange (e) {
    setSearch(e.target.value);
  }

  return (
    <Spread>
      <h1 className='current-location'>
        <span className='mr-md'>
          <Link className='vcenter' to={par}><img src={arrowImage} alt='up' /></Link>
        </span>
        {
          interleave(cwd, '/').map((dir, index) => <span key={index} className='current-location-part'>{dir}</span>)
        }
      </h1>
      <div className='search-input-wrapper'>
        <input
          type='search'
          className='text-input search-input'
          placeholder='Search for anything'
          value={search}
          onChange={onSearchChange}
        />
        <img src={searchImage} role='presentation' alt='' />
      </div>
    </Spread>
  );
}

const mapStateToProps = state => ({
  cwd: state.view.cwd,
  search: state.ui.search,
});

export default connect (mapStateToProps, {setSearch}) (Header);

