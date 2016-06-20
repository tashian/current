import React     from 'react';
import { Route, IndexRoute }   from 'react-router';
import App from './components/index';
import CurrentPosts from './components/CurrentPosts';
import NoMatch from './components/common/NoMatch';

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={CurrentPosts}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);
