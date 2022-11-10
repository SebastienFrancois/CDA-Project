import { useMutation } from '@apollo/client';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { LABELS } from './../../api/query';
import React, { FC, useState } from 'react';
import './AddLabelModal.scss';

interface AddLabelModalProps {
  isShowingModal: boolean;
  hide: () => void;
}

const AddLabelModal: FC<AddLabelModalProps> = ({ isShowingModal, hide }) => {
  const [labelName, setLabelName] = useState('');
  const [labelColor, setLabelColor] = useState('');

  const [addLabel] = useMutation(LABELS.add);

  // function that add a new label in BDD
  function handleNewLabel(e: any) {
    e.stopPropagation();
    addLabel({
      variables: {
        name: labelName,
        color: labelColor,
      },
      refetchQueries: 'active',
    });
    // .then((res) => setLabelsToUpdate([...labelsToUpdate, res.data.addLabel._id]))
    .then(handleUpdateTask);
  }

  return (
    <div className="modalLabel absolute p-4">
      <XIcon
        className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer ml-auto mb-2"
        onClick={hide}
      />
      <div className="mb-2">
        <input
          className="rounded p-1"
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            setLabelName(e.target.value);
          }}
          placeholder="Label Name"
        />
      </div>
      <div className="mb-2 flex labelColorSelect rounded gap-2">
        <input
          type="color"
          name="color"
          id="color"
          onChange={(e) => {
            setLabelColor(e.target.value);
          }}
        />
        <p>{labelColor}</p>
      </div>
      <div className="flex flex-row-reverse gap-4 mt-2 justify-start">
        <button className="cta-modify" onClick={(e) => handleNewLabel(e)}>
          <CheckIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
        </button>
        <button
          className="cta-cancel"
          onClick={(e) => {
            e.stopPropagation();
            setLabelColor('');
            setLabelName('');
            hide();
          }}
        >
          <XIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default AddLabelModal;
