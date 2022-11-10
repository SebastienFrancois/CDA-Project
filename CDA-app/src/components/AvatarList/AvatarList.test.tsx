import React from 'react';
import ReactDOM from 'react-dom';
import AvatarList from './AvatarList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AvatarList />, div);
  ReactDOM.unmountComponentAtNode(div);
});