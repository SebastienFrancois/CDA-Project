import React from 'react';
import ReactDOM from 'react-dom';
import DevCheckbox from './DevCheckbox';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DevCheckbox />, div);
  ReactDOM.unmountComponentAtNode(div);
});