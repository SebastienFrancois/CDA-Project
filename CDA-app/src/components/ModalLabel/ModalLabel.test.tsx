import React from 'react';
import ReactDOM from 'react-dom';
import ModalLabel from './ModalLabel';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalLabel />, div);
  ReactDOM.unmountComponentAtNode(div);
});