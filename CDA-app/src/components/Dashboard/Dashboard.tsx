/* eslint-disable no-console */
import React, { FC } from 'react';
import { ArchiveIcon, ChartBarIcon, FolderIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import AddButton from 'components/AddButton/AddButton.lazy';
import ProjectCard from 'components/ProjectCard/ProjectCard.lazy';
import './Dashboard.scss';
import HeaderMain from 'components/HeaderMain/HeaderMain';

export interface DashboardProps {
  projects: { getProjects: [IProject] };
}

const Dashboard: FC<DashboardProps> = ({ projects }) => {
  return (
    <>
      <HeaderMain />
      <h1 className=" text-3xl my-4 text-primary font-medium flex">
        <span className=" h-full flex place-items-end pr-2">
          <ChartBarIcon className="w-8 h-auto text-primary" />
        </span>
        Stats :
      </h1>
      <p className=" text-base font-normal text-slate-500">No content yet</p>
      <h1 className=" text-3xl my-4 text-primary font-medium flex">
        <span className=" h-full flex place-items-end pr-2">
          <FolderIcon className="w-8 h-auto text-primary" />
        </span>
        My projects :
      </h1>
      <div className="flex flex-wrap gap-5">
        {projects && projects.getProjects
          ? projects.getProjects.map((project: IProject) => (
              <ProjectCard key={project._id} data={project} />
            ))
          : ''}
        <aside className="flex items-center">
          <Link to={'/create-project'} state={{ update: false }}>
            <AddButton onClick={() => console.log('navigate to create project')} />
          </Link>
        </aside>
      </div>
      <h1 className=" text-3xl my-4 text-primary font-medium flex">
        <span className=" h-full flex place-items-end pr-2">
          <ArchiveIcon className="w-8 h-auto text-primary" />
        </span>
        Archived :
      </h1>
      <p className=" text-base font-normal text-slate-500">No content yet</p>
    </>
  );
};

export default Dashboard;
