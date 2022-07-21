import React, { FC } from 'react';
import './BasicButton.scss';

export interface BasicButtonProps {
  content: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: React.SyntheticEvent) => void;
  variant?: 'secondary' | 'primary';
  animationDisabled?: boolean;
}

const BasicButton: FC<BasicButtonProps> = ({
  onClick,
  content,
  type = 'button',
  variant = 'primary',
  animationDisabled = false,
}) => (
  <button
    type={type}
    className={`${
      variant === 'secondary'
        ? 'bg-secondary text-primary font-bold'
        : 'bg-primary  text-white font-medium'
    } text-base  capitalize tracking-wide hover:bg-opacity-80 h-auto rounded p-3 ${
      animationDisabled ? 'w-28' : 'w-52 hover:w-64 transition-all ease-in-out duration-300'
    }`}
    onClick={(e) => onClick(e)}
  >
    {content}
  </button>
);

export default BasicButton;
