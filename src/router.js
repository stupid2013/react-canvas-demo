import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/index';
import Check from './routes/check';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/check" component={Check} />
    </Router>
  );
}

export default RouterConfig;
