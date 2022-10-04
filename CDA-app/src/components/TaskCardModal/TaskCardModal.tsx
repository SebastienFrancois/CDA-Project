import React, { FC } from 'react';
import dayjs from 'dayjs';
import './TaskCardModal.scss';
import IconCalendar from './../../assets/png/icon-calendar.png';
import TaskCardChat from './../TaskCardChat/TaskCardChat';

interface TaskCardModalProps {
  isShowing: boolean;
  hide: () => void;
  task: ITask;
}

const TaskCardModal: FC<TaskCardModalProps> = ({ isShowing, hide, task }) =>
  isShowing ? (
    <div className="modal-overlay">
      <div className="TaskCardModal flex flex-col px-10 py-6 content-around">
        <div className="flex justify-between items-center mb-8">
          <p className="modal-title text-3xl basis-1/2">{task.name}</p>
          <div className="flex self flex-wrap">
            <p
              className={`pill font-bold uppercase ${task.status?.replace(' ', '-')}`}
              // style={{ color: label.color, background: `${label.color}33` }}
            >
              task {task.status}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-button self-start"
            onClick={(e) => {
              e.stopPropagation();
              hide();
            }}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="mt-6">
          <p className="font-bold">Task&#39;s description</p>
          <p>{task.description}</p>
        </div>
        <div className="mt-6">
          <p className="font-bold">Assign to</p>
          <p>pioupiou et pioupiou</p>
        </div>
        <div className="mt-6">
          <p className="font-bold">Add labels</p>
          <div className="flex gap-2 flex-wrap mt-2">
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
          </div>
        </div>
        <div className="flex mt-6 w-2/4 items-center justify-between">
          <div className="flex w-3/4">
            <p className="font-bold">Due date :</p>
            <p className="ml-2">{dayjs(Number(task.dueDate)).format('DD/MM/YYYY')}</p>
          </div>
          <div>
            <img src={IconCalendar} alt="icon calendar" width={14} height={14} />
          </div>
        </div>
        <TaskCardChat />
      </div>
    </div>
  ) : null;

export default TaskCardModal;
