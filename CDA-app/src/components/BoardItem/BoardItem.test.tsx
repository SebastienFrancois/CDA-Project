import React from 'react';
import ReactDOM from 'react-dom';
import BoardItem from './BoardItem';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoardItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});