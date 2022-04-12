import React from 'react';
import ReactDOM from 'react-dom';
import AppAuthenticated from './AppAuthenticated';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppAuthenticated />, div);
  ReactDOM.unmountComponentAtNode(div);
});
