import React from 'react';
import { hot } from 'react-hot-loader/root'

import App from 'Containers/App';
import 'Styles/Base.scss';

export class Root extends React.PureComponent {
  render () {
    return (
      <App />
    );
  }
}

export default hot(Root);
