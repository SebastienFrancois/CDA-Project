import React from 'react';
import ReactDOM from 'react-dom';
import SpinLoader from './SpinLoader';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpinLoader />, div);
  ReactDOM.unmountComponentAtNode(div);
});