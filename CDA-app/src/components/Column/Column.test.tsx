import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Column />, div);
  ReactDOM.unmountComponentAtNode(div);
});