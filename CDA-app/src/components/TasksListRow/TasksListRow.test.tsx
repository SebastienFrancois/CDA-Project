import React from 'react';
import ReactDOM from 'react-dom';
import TasksListRow from './TasksListRow';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TasksListRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});