/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import { PROJECTS } from 'api/query';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import './ProjectCard.scss';
import { Link, useNavigate } from 'react-router-dom';

interface StatusBadgeProps {
  status: Status;
}

export interface ProjectCardProps {
  data: IProject;
  canEdit: boolean;
}
const colorStatus: { [key: string]: { text: string; bg: string; border: string } } = {
  'not started': { text: 'text-gray-600', bg: 'bg-gray-200', border: 'border-gray-500' },
  'in progress': {
    text: 'text-yellow-600',
    bg: 'bg-yellow-200',
    border: 'border-yellow-600',
  },
  done: { text: 'text-green-600', bg: 'bg-green-200', border: 'border-green-200' },
  late: { text: 'text-red-600', bg: 'bg-red-200', border: 'border-red-200' },
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`w-24 h-auto text-center text-sm font-bold rounded-md first-letter:capitalize my-1 p-1 ${
        colorStatus[status].text + ' ' + colorStatus[status].bg
      } `}
    >
      {status || 'Not Started'}
    </span>
  );
};

const ProjectCard: FC<ProjectCardProps> = ({ data, canEdit = false }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { _id, name, status, dueDate } = data;
  const [deleteProject] = useMutation(PROJECTS.delete);
  const onDelete = () => {
    const variables = { deleteProjectId: _id };
    deleteProject({ variables, refetchQueries: 'active' }).then().catch();
  };

  const onUpdate = () => {
    navigate('/update-project', { state: { item: data, update: true } });
  };

  return (
    <div
      className={`ProjectCard cursor-pointer bg-white w-48 h-36 flex justify-center items-center p-3 rounded-lg drop-shadow-xl border-2 flex-col hover:scale-105 transition-all ease-in-out ${colorStatus[status].border}`}
    >
      <div className="w-full flex justify-between">
        {canEdit && (
          <>
            <TrashIcon
              className="w-4 h-auto opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
              onClick={onDelete}
            />
            <PencilIcon
              className="w-4 h-auto opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer"
              onClick={onUpdate}
            />
          </>
        )}
      </div>
      <Link className="w-full" to={'/project/' + _id}>
        <h1 className="w-full text-left text-2xl my-1 truncate">{name}</h1>
        <div className="w-full flex justify-end">
          <StatusBadge status={status} />
        </div>
        <div className="w-full text-right">
          <p className="text-sm first-letter:capitalize">{`${
            status !== 'archived' ? t('project:due') : t('project:archived')
          } : ${dayjs(Number(dueDate)).format('DD/MM/YYYY')}`}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
