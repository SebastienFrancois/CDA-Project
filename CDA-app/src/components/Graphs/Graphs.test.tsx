import React from 'react';
import ReactDOM from 'react-dom';
import Graphs from './Graphs';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Graphs />, div);
  ReactDOM.unmountComponentAtNode(div);
});