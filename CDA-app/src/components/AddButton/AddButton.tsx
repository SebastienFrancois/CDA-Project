import React, { FC } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import './AddButton.scss';

interface AddButtonProps {
  onClick: () => void;
  size: string;
}

const AddButton: FC<AddButtonProps> = ({ onClick, size = 'large' }) => {
  let sizeButton = 'w-8';
  if (size === 'small') sizeButton = 'w-4';
  return (
    <button
      role="button"
      type="button"
      className={`w-auto p-2 rounded-lg drop-shadow-xl border-2 flex-col hover:scale-105 hover:bg-primary hover:bg-opacity-20 border-primary flex justify-center items-center transition-all ease-in-out h-min relative`}
      onClick={onClick}
    >
      <PlusIcon className={`${sizeButton}`} />
    </button>
  );
};

export default AddButton;
