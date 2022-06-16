import React from 'react';
import ReactDOM from 'react-dom';
import InputBasic from './InputBasic';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputBasic />, div);
  ReactDOM.unmountComponentAtNode(div);
});