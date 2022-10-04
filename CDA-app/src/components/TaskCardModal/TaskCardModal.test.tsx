import React from 'react';
import ReactDOM from 'react-dom';
import TaskCardModal from './TaskCardModal';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskCardModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});