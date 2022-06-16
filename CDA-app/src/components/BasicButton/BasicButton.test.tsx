import React from 'react';
import ReactDOM from 'react-dom';
import BasicButton from './BasicButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BasicButton
      content={''}
      onClick={function (): void {
        throw new Error('Function not implemented.');
      }}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
