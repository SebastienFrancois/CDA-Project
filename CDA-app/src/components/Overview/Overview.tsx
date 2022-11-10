import { ProjectContext } from './../../contexts/ProjectContext';
import { AuthContext } from './../../contexts/AuthContext';
import React, { FC, useContext } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './Overview.scss';

const Overview: FC = () => {
  const { project } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);

  const isAdmin = currentUser?.role === 'ADMIN';
  const navigate = useNavigate();

  const onUpdate = () => {
    navigate('/update-project', { state: { item: project, update: true } });
  };

  return (
    <div className="content">
      <div className="flex gap-3">
        <h1 className="project-overview-title my-4">Project informations</h1>
        {isAdmin && (
          <PencilIcon
            className="w-6 h-auto opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
            onClick={onUpdate}
          />
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-1/3">
          <div className="TaskCard">
            <h2 className="text-2xl">{project?.name}</h2>
          </div>
          <div className="TaskCard">
            <p>
              <span className="text-lg">Start: </span>
              {dayjs(Number(project?.createdAt)).format('DD/MM/YYYY')}
            </p>
            <p>
              <span className="text-lg">End: </span>
              {dayjs(Number(project?.dueDate)).format('DD/MM/YYYY')}
            </p>
          </div>
          <div className="TaskCard">
            <p className="project-overview-status text-xl">{project?.status}</p>
          </div>
        </div>
        <div className="TaskCard w-2/3">
          <p className="text-2xl capitalize pb-2">Description</p>
          <p>{project?.description}</p>
        </div>
        <div className="TaskCard flex flex-col gap-2 w-1/3">
          <div>
            <p className="project-overview-pre text-2xl pb-2">Project Manager:</p>
            <p className="capitalize">{project?.projectManager?.username}</p>
          </div>
          <div>
            <p className="project-overview-pre text-2xl pb-2">Developpers:</p>
            {project?.developpers?.length &&
              project?.developpers.map((dev) => (
                <p className="capitalize" key={dev._id}>
                  {dev.username}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
