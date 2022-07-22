/* eslint-disable no-console */
import React, { FC } from 'react';
import { ArchiveIcon, ChartBarIcon, FolderIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import AddButton from 'components/AddButton/AddButton.lazy';
import ProjectCard from 'components/ProjectCard/ProjectCard.lazy';
import './Dashboard.scss';
import HeaderMain from 'components/HeaderMain/HeaderMain';
import SpinLoader from 'components/SpinLoader/SpinLoader';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

export interface DashboardProps {
  projects: { getProjects: [IProject] };
  isLoading: boolean;
}

const Dashboard: FC<DashboardProps> = ({ projects, isLoading = false }) => {
  const { currentUser } = useContext(AuthContext);

  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <>
      <HeaderMain />
      {isLoading ? (
        <div className="h-full  w-full flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <>
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
            {projects && projects.getProjects ? (
              projects.getProjects.map((project: IProject) => (
                <ProjectCard key={project._id} data={project} canEdit={isAdmin} />
              ))
            ) : (
              <p>No project on going ...</p>
            )}
            {isAdmin && (
              <aside className="flex items-center">
                <Link to={'/create-project'} state={{ update: false }}>
                  <AddButton onClick={() => console.log('navigate to create project')} />
                </Link>
              </aside>
            )}
          </div>
          <h1 className=" text-3xl my-4 text-primary font-medium flex">
            <span className=" h-full flex place-items-end pr-2">
              <ArchiveIcon className="w-8 h-auto text-primary" />
            </span>
            Archived :
          </h1>
          <p className=" text-base font-normal text-slate-500">No content yet</p>
        </>
      )}
    </>
  );
};

export default Dashboard;
