import React from 'react';
import ReactDOM from 'react-dom';
import AddLabelModal from './AddLabelModal';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddLabelModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});