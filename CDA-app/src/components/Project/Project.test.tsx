import React from 'react';
import ReactDOM from 'react-dom';
import { Project } from './Project';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Project />, div);
  ReactDOM.unmountComponentAtNode(div);
});
