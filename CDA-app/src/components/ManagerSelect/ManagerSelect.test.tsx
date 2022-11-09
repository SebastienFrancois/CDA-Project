import React from 'react';
import ReactDOM from 'react-dom';
import ManagerSelect from './ManagerSelect';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManagerSelect />, div);
  ReactDOM.unmountComponentAtNode(div);
});