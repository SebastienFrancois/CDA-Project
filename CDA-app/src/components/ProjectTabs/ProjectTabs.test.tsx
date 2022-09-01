import React from 'react';
import ReactDOM from 'react-dom';
import ProjectTabs from './ProjectTabs';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectTabs />, div);
  ReactDOM.unmountComponentAtNode(div);
});