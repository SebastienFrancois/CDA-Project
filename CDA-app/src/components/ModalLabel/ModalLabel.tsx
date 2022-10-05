import { CheckIcon, XIcon } from '@heroicons/react/solid';
import React, { FC, useState, MouseEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LABELS } from './../../api/query';
import './ModalLabel.scss';

interface ModalLabelProps {
  isShowingModal: boolean;
  hide: () => void;
  labelsToUpdate: string[];
  setLabelsToUpdate: any;
  handleUpdateTask: any;
}

const ModalLabel: FC<ModalLabelProps> = ({
  isShowingModal,
  hide,
  labelsToUpdate,
  setLabelsToUpdate,
  handleUpdateTask, //++++ ne fonctionneuh pas!!!!!!!!
}) => {
  const { loading, error, data } = useQuery(LABELS.get);
  const [addLabel] = useMutation(LABELS.add);

  let labels = [];
  if (!loading) {
    labels = data.getLabels;
  }

  const [labelName, setLabelName] = useState('');
  const [labelColor, setLabelColor] = useState('');

  function handleNewLabel(e: MouseEvent) {
    e.stopPropagation();
    addLabel({
      variables: {
        name: labelName,
        color: labelColor,
      },
      refetchQueries: 'active',
    })
      .then((res) => setLabelsToUpdate([...labelsToUpdate, res.data.addLabel._id]))
      .then(handleUpdateTask(e));
  }

  return isShowingModal ? (
    <div className="modalLabel absolute p-4">
      <div>
        <p className="font-bold">Select label</p>
        <hr className="my-2" />
        <div>
          {labels &&
            labels.map((label: ILabel) => (
              <div key={label.name}>
                <input
                  hidden={true}
                  type="checkbox"
                  name={label.name}
                  id={label.name}
                  checked={labelsToUpdate.some((l) => l._id === label._id)}
                  onChange={() => setLabelsToUpdate} //ajouter ou enlever l'id du label
                />
                <label
                  htmlFor={label.name}
                  className={labelsToUpdate.some((l) => l._id === label._id) ? 'font-bold' : ''}
                >
                  {label.name}
                </label>
              </div>
            ))}
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex flex-col">
        <p className="mb-2 font-bold">Add new label</p>
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
        <div className="flex gap-4 mt-2 self-end">
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
    </div>
  ) : null;
};

export default ModalLabel;
