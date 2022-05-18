import React from 'react';
import ReactDOM from 'react-dom';
import ProjectCard from './ProjectCard';

it.skip('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
