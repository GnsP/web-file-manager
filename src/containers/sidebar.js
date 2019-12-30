/**
 * COMPONENT: Sidebar
 * PURPOSE: The app sidebar, contains the treeview
 * STYLE: styles/layouts/_sidebar.scss
 */

import React from 'react';
import { connect } from 'react-redux';
import Treeview from 'components/treeview';

function Sidebar ({ tree }) {
  return (
    <div className='sidebar-container'>
      <Treeview tree={tree} />
    </div>
  );
}

const mapStateToProps = state => ({
  tree: state.view.root,
});

export default connect (mapStateToProps) (Sidebar);
