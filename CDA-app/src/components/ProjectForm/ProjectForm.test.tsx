import React from 'react';
import ReactDOM from 'react-dom';
import ProjectForm from './ProjectForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
