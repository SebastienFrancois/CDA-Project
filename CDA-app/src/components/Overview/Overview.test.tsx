import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Overview />, div);
  ReactDOM.unmountComponentAtNode(div);
});