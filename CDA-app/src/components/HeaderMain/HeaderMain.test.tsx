import React from 'react';
import ReactDOM from 'react-dom';
import HeaderMain from './HeaderMain';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});