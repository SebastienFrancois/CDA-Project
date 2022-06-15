/* eslint-disable no-console */
import React, { FC } from 'react';
import { ArchiveIcon, ChartBarIcon, FolderIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import AddButton from 'components/AddButton/AddButton.lazy';
import ProjectCard from 'components/ProjectCard/ProjectCard.lazy';
import './Dashboard.scss';

interface DashboardProps {
  projects: any;
}

const Dashboard: FC<DashboardProps> = ({ projects }) => {
  return projects.getProjects ? (
    <>
      <div className="w-10/12 p-6 h-full flex flex-col justify-start items-start">
        <h1 className=" text-3xl my-4 text-primary font-medium flex">My dashboard</h1>
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
          {projects.getProjects.map((project: any, _key: any) => (
            <ProjectCard
              key={project._id}
              name={project.name}
              status={project.status}
              dueDate={project.dueDate}
            />
          ))}
          <aside className="flex items-center">
            <Link to={'create-project'}>
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
      </div>
    </>
  ) : (
    <>No projects to show</>
  );
};

export default Dashboard;
