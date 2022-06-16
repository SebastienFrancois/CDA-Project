import React, { FC } from 'react';
import './BasicButton.scss';

interface BasicButtonProps {
  content: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: React.SyntheticEvent) => void;
}

const BasicButton: FC<BasicButtonProps> = ({ onClick, content, type = 'button' }) => (
  <button
    type={type}
    className="bg-primary text-base text-white font-medium capitalize tracking-wide hover:bg-opacity-80 w-52 h-auto rounded p-3 hover:w-64 transition-all ease-in-out duration-300 "
    onClick={(e) => onClick(e)}
  >
    {content}
  </button>
);

export default BasicButton;
