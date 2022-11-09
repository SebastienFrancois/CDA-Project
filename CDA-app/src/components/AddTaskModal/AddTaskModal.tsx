import React, { FC, useState } from 'react';
import { XIcon, CheckIcon } from '@heroicons/react/solid';
import { useMutation, useQuery } from '@apollo/client';
import { LABELS } from './../../api/query';
import './AddTaskModal.scss';
import DevCheckbox from './../../components/DevCheckbox/DevCheckbox';

interface AddTaskModalProps {
  isShowing: boolean;
  hide: () => void;
}

const AddTaskModal: FC<AddTaskModalProps> = ({ isShowing, hide }) => {
  const { data: labels } = useQuery(LABELS.get);

  return isShowing ? (
    <div className="modal-overlay">
      <form className="AddTaskModal flex flex-col px-10 py-6 justify-between">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            name=""
            id=""
            placeholder="Task's title"
            className="border rounded border-gray-400 outline-none p-1 w-72"
          />
          <div>
            <select className="rounded bg-white">
              <option value="backlog">Backlog</option>
              <option value="in progress">In Progress</option>
              <option value="in review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <XIcon
            className="w-8 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
            onClick={hide}
          />
        </div>
        <div>
          <h2>Task&#39;s description</h2>
          <textarea
            placeholder="Task's description"
            className="w-3/4 resize-none border rounded border-gray-400 outline-none p-1"
            // value={taskDescription}
            // onChange={(e) => {
            //   setTaskDescription(e.target.value);
            // }}
          ></textarea>
        </div>
        <div>
          <h2>Assign to</h2>
          {/* <DevCheckbox data={} developpers={} setDeveloppers={} /> */}
        </div>
        <div>
          <h2>Add labels</h2>
          <div className="flex gap-2 flex-wrap mt-2 items-center">
            {labels.getLabels &&
              labels.getLabels.length &&
              labels.getLabels.map((label, i) => (
                <div key={label._id + i}>
                  <input type="checkbox" value={label._id} id={label._id} name={label._id} />
                  <label
                    htmlFor={label._id}
                    className="pill font-bold"
                    style={{ color: label.color, background: `${label.color}33` }}
                  >
                    {label.name}
                  </label>
                </div>
              ))}

            {/* {isAdmin && (
              <div className="relative">
                <AddButton
                  size="small"
                  onClick={() => {
                    setShowLabelModal(!showLabelModal);
                  }}
                />
                <ModalLabel
                  isShowingModal={showLabelModal}
                  hide={() => setShowLabelModal(!showLabelModal)}
                  labelsToUpdate={labelsToUpdate}
                  setLabelsToUpdate={(e: any) => handleSetLabelsToUpdate(e)}
                  handleUpdateTask={() => handleUpdateTask}
                  task={task}
                />
              </div>
            )} */}
          </div>
        </div>
        <div className="flex items-center">
          <h2>Due date: </h2>
          <input
            type="date"
            // value={dayjs(Number(taskDueDate)).format('YYYY/MM/DD').replaceAll('/', '-')}
            className="ml-2"
            // onChange={(e) => {
            //   setTaskDueDate(new Date(e.target.value));
            // }}
          />
        </div>
        <div className="flex self-end justify-end gap-3">
          <button
            className="text-secondary font-bold capitalize hover:bg-opacity-80 h-auto rounded p-3 w-52"
            type="reset"
          >
            Cancel
          </button>
          <button
            className="addTaskBtn text-white font-bold capitalize hover:bg-opacity-80 h-auto rounded p-3 w-52"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default AddTaskModal;
