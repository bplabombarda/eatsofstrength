import React from 'react';

import App from '../App';

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
