/* eslint-disable react/no-unused-state */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getRoutes } from '~/routes';
import './index.less';

class App extends React.PureComponent {
  public render(): JSX.Element {
    return getRoutes();
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
