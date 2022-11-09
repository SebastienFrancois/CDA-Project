/* eslint-disable no-console */
import React, { FC, useState, useContext, ChangeEvent, useEffect } from 'react';
import dayjs from 'dayjs';

import { useMutation, useQuery } from '@apollo/client';
import { PROJECTS, TASKS, USERS } from './../../api/query';

import TaskCardChat from './../TaskCardChat/TaskCardChat';
import AddButton from '../AddButton/AddButton';
import { XIcon, CheckIcon } from '@heroicons/react/solid';

import { AuthContext } from './../../contexts/AuthContext';

import './TaskCardModal.scss';

import IconCalendar from './../../assets/png/icon-calendar.png';
import ModalLabel from './../ModalLabel/ModalLabel';
import { ProjectContext } from './../../contexts/ProjectContext';
import AvatarList from './../../components/AvatarList/AvatarList';

interface TaskCardModalProps {
  isShowing: boolean;
  hide: () => void;
  task: ITask;
}

const TaskCardModal: FC<TaskCardModalProps> = ({ isShowing, hide, task }) => {
  const { currentUser } = useContext(AuthContext);
  const { project, setProject } = useContext(ProjectContext);
  const { data } = useQuery(USERS.get);

  const isAdmin = currentUser?.role === 'ADMIN';

  const [updateTask] = useMutation(TASKS.update);

  // states for inputs
  const [taskName, setTaskName] = useState(task.name);
  const [isUpdatingTaskName, setIsUpdatingTaskName] = useState(true);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [isUpdatingTaskStatus, setIsUpdatingTaskStatus] = useState(false);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [isUpdatingTaskDescription, setIsUpdatingTaskDescription] = useState(false);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [isUpdatingTaskDueDate, setIsUpdatingTaskDueDate] = useState(false);
  const [developpers, setDeveloppers] = useState<string[]>(
    task.assignTo.length ? task.assignTo.map((dev: any) => dev._id) : [],
  );
  const [updateDev, setUpdateDev] = useState(false);

  const [showLabelModal, setShowLabelModal] = useState(false); // show/hide modal Labels
  const [labelsToUpdate, setLabelsToUpdate] = useState(task.labels.map((label) => label._id)); // id to update according to user's choice

  // function to update a task
  async function handleUpdateTask() {
    updateTask({
      variables: {
        updateTaskId: task._id,
        name: taskName,
        status: taskStatus,
        description: taskDescription,
        dueDate: taskDueDate,
        labels: labelsToUpdate,
        assignTo: developpers,
      },
      refetchQueries: 'active',
    });
    // changes boolean to hide the inputs
    setIsUpdatingTaskName(false);
    setIsUpdatingTaskStatus(false);
    setIsUpdatingTaskDescription(false);
    setIsUpdatingTaskDueDate(false);
    setUpdateDev(false);
  }

  // function to change state of labels on a task depending if a label is checked or not
  const handleSetLabelsToUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    //if checked add id to labelstoupdate
    if (e.target.checked && !labelsToUpdate.includes(e.target.value)) {
      setLabelsToUpdate([...labelsToUpdate, e.target.value]);
    }

    //if checked false remove labeltoupdate
    if (!e.target.checked) {
      setLabelsToUpdate(labelsToUpdate.filter((labelId) => labelId !== e.target.value));
    }
  };

  useEffect(() => {
    console.log('fired modal');
    handleUpdateTask();
  }, [labelsToUpdate]);

  useEffect(() => {
    //guard if description is empty show textarea
    setIsUpdatingTaskDescription(!task.description);
  }, []);

  console.log({ isUpdatingTaskDescription });

  // modal to display a task
  return isShowing ? (
    <div className="modal-overlay">
      <div className="TaskCardModal flex flex-col px-10 py-6 content-around">
        <div className="flex justify-between items-center mb-6">
          <div onClick={() => setIsUpdatingTaskName(true)}>
            {isUpdatingTaskName ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={taskName}
                  className="text-3xl italic input-modify"
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
                <div className="flex flex-row-reverse gap-4 mt-2 self-end">
                  <button
                    className="cta-modify"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateTask();
                    }}
                  >
                    <CheckIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
                  </button>
                  <button
                    className="cta-cancel"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskName(task.name);
                      setIsUpdatingTaskName(false);
                    }}
                  >
                    <XIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="modal-title text-3xl basis-1/2">{taskName}</p>
            )}
          </div>
          <div className="flex self flex-wrap" onClick={() => setIsUpdatingTaskStatus(true)}>
            {isUpdatingTaskStatus ? (
              <div className="flex flex-col">
                <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                  <option value="backlog">Backlog</option>
                  <option value="in progress">In Progress</option>
                  <option value="in review">In Review</option>
                  <option value="done">Done</option>
                </select>
                <div className="flex flex-row-reverse gap-4 mt-2 self-end">
                  <button
                    className="cta-modify"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateTask();
                    }}
                  >
                    <CheckIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
                  </button>
                  <button
                    className="cta-cancel"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUpdatingTaskStatus(false);
                    }}
                  >
                    <XIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
                  </button>
                </div>
              </div>
            ) : (
              <p className={`pill font-bold uppercase ${task.status?.replace(' ', '-')}`}>
                task {taskStatus}
              </p>
            )}
          </div>
          <XIcon
            className="w-8 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
            onClick={hide}
          />
        </div>
        <div className="mt-6">
          <p className="font-bold">Task&#39;s description</p>
          <div onClick={() => setIsUpdatingTaskDescription(true)}>
            {isUpdatingTaskDescription ? (
              <div className="flex gap-4 items-start">
                <textarea
                  className="w-3/4 resize-none italic border-b border-gray-400 outline-none"
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                ></textarea>
                <div className="flex flex-row-reverse gap-4">
                  <button
                    className="cta-modify"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateTask();
                    }}
                  >
                    <CheckIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
                  </button>
                  <button
                    className="cta-cancel"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskDescription(task.description);
                      setIsUpdatingTaskDescription(false);
                    }}
                  >
                    <XIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
                  </button>
                </div>
              </div>
            ) : (
              <p>{taskDescription}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <p className="font-bold">Assign to</p>
          <AvatarList
            allUsers={data}
            developpers={developpers}
            setDeveloppers={setDeveloppers}
            updateDev={updateDev}
            setUpdateDev={setUpdateDev}
          />
          {updateDev && (
            <div className="flex flex-row-reverse gap-4 mt-2 self-end">
              <button
                className="cta-modify"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateTask();
                }}
              >
                <CheckIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
              </button>
              <button
                className="cta-cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateDev(false);
                }}
              >
                <XIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-6">
          <p className="font-bold">Add labels</p>
          <div className="flex gap-2 flex-wrap mt-2 items-center">
            {task.labels.length > 0 &&
              task.labels.map((label, i) => (
                <p
                  key={label._id + i}
                  className="pill font-bold"
                  style={{ color: label.color, background: `${label.color}33` }}
                >
                  {label.name}
                </p>
              ))}

            {isAdmin && (
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
            )}
          </div>
        </div>
        {isUpdatingTaskDueDate ? (
          <div className="flex gap-10">
            <div className="flex mt-6 items-center">
              <div className="flex">
                <p className="font-bold">Due date :</p>
                <input
                  type="date"
                  value={dayjs(Number(taskDueDate)).format('YYYY/MM/DD').replaceAll('/', '-')}
                  className="ml-2"
                  onChange={(e) => {
                    setTaskDueDate(new Date(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 mt-2 self-end">
              <button className="cta-modify" onClick={() => handleUpdateTask()}>
                <CheckIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
              </button>
              <button
                className="cta-cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  setTaskDueDate(task.dueDate);
                  setIsUpdatingTaskDueDate(false);
                }}
              >
                <XIcon className="w-6 opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex mt-6 w-2/4 items-center justify-between">
            <div className="flex w-3/4">
              <p className="font-bold">Due date :</p>
              <p className="ml-2">{dayjs(Number(taskDueDate)).format('DD/MM/YYYY')}</p>
            </div>
            <div onClick={() => setIsUpdatingTaskDueDate(true)}>
              <img src={IconCalendar} alt="icon calendar" width={14} height={14} />
            </div>
          </div>
        )}
        <TaskCardChat taskId={task._id} />
      </div>
    </div>
  ) : null;
};

export default TaskCardModal;
