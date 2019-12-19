import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import HomePage from '~/pages';

export const history = createBrowserHistory();

export function getRoutes(): JSX.Element {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}
