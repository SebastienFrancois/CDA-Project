import React from 'react';
import ReactDOM from 'react-dom';
import BoardColumn from './BoardColumn';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoardColumn />, div);
  ReactDOM.unmountComponentAtNode(div);
});