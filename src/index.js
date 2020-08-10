import React from 'react';
import { render } from 'react-dom';

import Root from './containers/Root';

require('Styles/index.scss');

render(
  <Root />,
  document.getElementById('root')
);
