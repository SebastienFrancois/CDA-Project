import React from 'react';
import ReactDOM from 'react-dom';
import AddButton from './AddButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AddButton
      onClick={function (): void {
        throw new Error('Function not implemented.');
      }}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
