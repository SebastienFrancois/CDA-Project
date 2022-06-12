import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ArchiveIcon, ChartBarIcon, FolderIcon, PlusIcon } from '@heroicons/react/solid';
import ProjectCard from 'components/ProjectCard/ProjectCard.lazy';
import Sidebar from 'components/Sidebar/Sidebar.lazy';
import './Dashboard.scss';

interface DashboardProps {}

const PROJECTS = gql`
  query projects {
    getProjects {
      _id
      name
      description
      status
      dueDate
      createdAt
      updatedAt
    }
  }
`;

const Dashboard: FC<DashboardProps> = () => {
  const { loading, error, data } = useQuery(PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <div className="w-2/12 h-full">
        <Sidebar projects={data} />
      </div>
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
          {data.getProjects.map((project: any, _key: any) => (
            <ProjectCard
              key={project._id}
              name={project.name}
              status={project.status}
              dueDate={project.dueDate}
            />
          ))}
          <aside className="flex items-center">
            <button
              role="button"
              type="button"
              className="w-auto p-2 rounded-lg drop-shadow-xl border-2 flex-col hover:scale-105 hover:bg-primary hover:bg-opacity-20 border-primary flex justify-center items-center transition-all ease-in-out h-min"
            >
              <PlusIcon className="w-8" />
            </button>
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
  );
};

export default Dashboard;
