/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PROJECTS } from 'api/query';
import './Project.scss';
import ProjectTabs from 'components/ProjectTabs/ProjectTabs.lazy';
import Overview from 'components/Overview/Overview.lazy';
import TasksList from 'components/TasksList/TasksList.lazy';
import AddTaskModal from 'components/AddTaskModal/AddTaskModal';
import Board from 'components/Board/Board.lazy';
import Graphs from 'components/Graphs/Graphs.lazy';
import { ProjectContext } from 'contexts/ProjectContext';
import useModal from '../../hooks/useModal';

interface ProjectProps {}
export const Project: FC<ProjectProps> = () => {
  const { setProject } = useContext(ProjectContext);
  const { id } = useParams();
  const { isShowing, toggle } = useModal();

  const { loading, data, refetch } = useQuery(PROJECTS.getOne, {
    variables: { getProjectId: id },
  });

  const [activeTab, setActiveTab] = useState('tab0');

  const handleClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const listTab = [
    { title: 'Overview' },
    { title: "Task's list" },
    { title: 'Board' },
    { title: 'Graphs' },
  ];

  useEffect(() => {
    if (!loading) {
      setProject(data.getProject);
      console.log(data);
    }
    refetch().then((res) => console.log('refetch', res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, setProject]);

  return (
    <>
      <AddTaskModal isShowing={isShowing} hide={toggle} projectId={id} />
      <div className="content w-full h-full flex flex-col">
        <div className="header">{/* Navbar to add with project title */}</div>
        <div className="content-wrapper h-full">
          <div className="flex justify-between">
            <div className="flex gap-5">
              {listTab.map((el, key) => (
                <ProjectTabs
                  key={key}
                  title={el.title}
                  id={'tab' + key}
                  activeTab={activeTab}
                  setActiveTab={handleClick}
                />
              ))}
            </div>
            <div className="mr-4">
              <button
                className="text-shadow rounded cursor-pointer p-3 rounded cursor-pointer p-3 bg-secondary text-black font-semibold hover:bg-primary hover:text-white transition-all ease-in-out"
                onClick={toggle}
              >
                Add task
              </button>
            </div>
          </div>
          <>
            {activeTab === 'tab0' && !loading ? <Overview /> : ''}
            {activeTab === 'tab1' && !loading ? <TasksList /> : ''}
            {activeTab === 'tab2' && !loading ? <Board /> : ''}
            {activeTab === 'tab3' && !loading ? <Graphs /> : ''}
          </>
        </div>
      </div>
    </>
  );
};

export default Project;
