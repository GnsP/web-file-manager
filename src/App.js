import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import Main from 'containers/main';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path='*' component={Main} />
      </HashRouter>
    </Provider>
  );
}

export default App;
