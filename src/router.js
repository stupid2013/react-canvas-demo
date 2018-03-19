import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './components/home';
import Check from './routes/check';
import Hubble from './routes/index';
import Canvas from './routes/canvas';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/canvas" component={Canvas} />
      <Route path="/hubble" component={Hubble} />
      <Route path="/hubble/:id" component={Check} />
    </Router>
  );
}

export default RouterConfig;
