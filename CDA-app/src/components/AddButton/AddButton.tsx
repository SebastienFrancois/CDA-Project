import React, { FC } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import './AddButton.scss';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick }) => (
  <button
    role="button"
    type="button"
    className="w-auto p-2 rounded-lg drop-shadow-xl border-2 flex-col hover:scale-105 hover:bg-primary hover:bg-opacity-20 border-primary flex justify-center items-center transition-all ease-in-out h-min"
    onClick={onClick}
  >
    <PlusIcon className="w-8" />
  </button>
);

export default AddButton;
