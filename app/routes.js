import React     from 'react';
import { Route } from 'react-router';
import App from './components/index';
import routes from '../routes/index';

export default (
  <Route name="app" component={App} path="/">
  </Route>
);
