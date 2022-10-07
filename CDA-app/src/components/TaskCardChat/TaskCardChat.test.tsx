import React from 'react';
import ReactDOM from 'react-dom';
import TaskCardChat from './TaskCardChat';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskCardChat />, div);
  ReactDOM.unmountComponentAtNode(div);
});