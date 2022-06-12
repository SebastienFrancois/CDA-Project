import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});