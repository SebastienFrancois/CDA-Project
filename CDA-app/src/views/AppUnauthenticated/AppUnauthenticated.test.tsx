import React from 'react';
import ReactDOM from 'react-dom';
import AppUnauthenticated from './AppUnauthenticated';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppUnauthenticated />, div);
  ReactDOM.unmountComponentAtNode(div);
});