/**
 * COMPONENT: Main
 * PURPOSE: Entry point of the app. Redirects to '#/root' if non-existing path is given in addressbar
 * STYLE: styles/layouts/_shell.scss
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import Sidebar from './sidebar';
import Explorer from './explorer';
import Header from './header';

import fstate from 'store/model';
import { jumpDir } from 'store/actions/fs';

function Main ({ match, tree, jumpDir, cwd }) {
  const reqPath = match.params[0];
  const path = fstate.exists(tree, reqPath) ? reqPath : '/root';

  if (path !== reqPath) {
    return <Redirect to={path} />;
  }

  if (cwd !== path) jumpDir(path);

  return (
    <div className='app-container'>
      <Helmet>
        <title>{path}</title>
      </Helmet>
      <Sidebar />
      <main className='main-container'>
        <Header />
        <Explorer />
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  tree: state.view,
  cwd: '/' + state.view.cwd.join('/'),
});

const MainComponent = connect (mapStateToProps, { jumpDir }) (Main);
export default MainComponent;
