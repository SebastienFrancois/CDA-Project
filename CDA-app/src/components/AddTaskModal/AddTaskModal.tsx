/* eslint-disable no-console */
import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useMutation, useQuery } from '@apollo/client';
import { LABELS, USERS, TASKS } from './../../api/query';
import './AddTaskModal.scss';
import DevCheckbox from './../../components/DevCheckbox/DevCheckbox';
import { AuthContext } from './../../contexts/AuthContext';
// import AddButton from './../../components/AddButton/AddButton';
// import AddLabelModal from './../../components/AddLabelModal/AddLabelModal';
import dayjs from 'dayjs';

interface AddTaskModalProps {
  isShowing: boolean;
  hide: () => void;
  projectId?: string;
}

const AddTaskModal: FC<AddTaskModalProps> = ({ isShowing, hide, projectId }) => {
  const { data: labels } = useQuery(LABELS.get);
  const [addLabel] = useMutation(LABELS.add);

  const { data: users } = useQuery(USERS.get);

  const [addTask] = useMutation(TASKS.add);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [developpers, setDeveloppers] = useState<string[]>([]);
  const [taskLabels, setTaskLabels] = useState<string[]>([]);
  const [taskDueDate, setTaskDueDate] = useState<Date>();
  const [gError, setgError] = useState<string>('');

  // const { currentUser } = useContext(AuthContext);
  // const canAdd = currentUser?.role === 'ADMIN' || currentUser?.role === 'CO';
  // const [showLabelModal, setShowLabelModal] = useState(false); // show/hide modal Labels

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTaskLabels([...(taskLabels ? taskLabels : []), e.target.value]);
    }
    if (!e.target.checked) {
      setTaskLabels([
        ...(taskLabels ? taskLabels : []).filter((label: string) => label !== e.target.value),
      ]);
    }
  };

  const form = {
    project: projectId,
    status: taskStatus,
    name: taskTitle,
    description: taskDescription,
    dueDate: taskDueDate,
    labels: taskLabels,
    assignTo: developpers,
  };

  const handleReset = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate(undefined);
    setTaskLabels([]);
    setDeveloppers([]);
    setTaskStatus('');
    setgError('');
    hide();
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (taskStatus == '') {
      setgError('Please select a status');
      return;
    }
    console.log(form);
    try {
      await addTask({
        variables: {
          project: projectId,
          status: taskStatus,
          name: taskTitle,
          description: taskDescription,
          dueDate: String(taskDueDate),
          labels: taskLabels,
          assignTo: developpers,
        },
        refetchQueries: 'active',
      });
      handleReset();
      hide();
    } catch (err: any) {
      setgError(err.message);
      console.log(err.message);
    }
  };

  return isShowing ? (
    <div className="modal-overlay">
      {gError && <span className="w-full text-left text-red-600 my-2 ">{gError}</span>}
      <form className="AddTaskModal flex flex-col px-10 py-6 justify-between">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            placeholder="Task's title"
            className="border rounded border-gray-400 outline-none p-1 w-72 text-3xl text-primary"
          />
          <div>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="rounded bg-white font-bold outline-none cursor-pointer"
            >
              <option value="">Status</option>
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
          <h2 className="font-bold">Task&#39;s description</h2>
          <textarea
            placeholder="Task's description"
            className="w-3/4 resize-none border rounded border-gray-400 outline-none p-1"
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <h2 className="font-bold mt-5">Assign to</h2>
          <DevCheckbox data={users} developpers={developpers} setDeveloppers={setDeveloppers} />
        </div>
        <div>
          <div className="flex gap-3">
            <h2 className="font-bold mt-5">Add labels</h2>
            {/* {canAdd && (
              <div className="relative">
                <AddButton
                  size="small"
                  onClick={() => {
                    setShowLabelModal(!showLabelModal);
                  }}
                />
                {showLabelModal && (
                  <AddLabelModal
                    isShowingModal={showLabelModal}
                    hide={() => setShowLabelModal(!showLabelModal)}
                    // labelsToUpdate={labelsToUpdate}
                    // setLabelsToUpdate={(e: any) => handleSetLabelsToUpdate(e)}
                    // handleUpdateTask={() => handleUpdateTask}
                    // task={task}
                  />
                )}
              </div>
            )} */}
          </div>
          <div className="labels-checkbox flex gap-2 flex-wrap mt-2 items-center">
            {labels.getLabels &&
              labels.getLabels.length &&
              labels.getLabels.map((label: ILabel, i: number) => (
                <div key={label._id + i}>
                  <input
                    type="checkbox"
                    value={label._id}
                    id={label._id}
                    name={label._id}
                    checked={taskLabels?.includes(label._id)}
                    onChange={handleCheckBox}
                  />
                  <label
                    htmlFor={label._id}
                    className="pill font-bold cursor-pointer"
                    style={{ color: label.color, background: `${label.color}33` }}
                  >
                    {label.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center mt-5">
          <h2 className="font-bold">Due date: </h2>
          <input
            type="date"
            value={dayjs(Number(taskDueDate)).format('YYYY/MM/DD').replaceAll('/', '-')}
            className="ml-2"
            onChange={(e) => {
              setTaskDueDate(new Date(e.target.value));
            }}
          />
        </div>
        <div className="flex self-end justify-end gap-3 mt-5">
          <button
            className="text-secondary font-bold capitalize hover:bg-secondary hover:text-white h-auto rounded p-3 w-52"
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            onClick={handleClick}
            className="addTaskBtn text-white font-bold capitalize bg-green-500 hover:bg-opacity-60 h-auto rounded p-3 w-52"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default AddTaskModal;
