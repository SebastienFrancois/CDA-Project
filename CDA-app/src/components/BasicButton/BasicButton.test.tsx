import React from 'react';
import ReactDOM from 'react-dom';
import BasicButton from './BasicButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BasicButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});