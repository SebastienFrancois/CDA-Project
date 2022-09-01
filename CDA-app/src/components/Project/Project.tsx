import React, { FC, useState } from 'react';
import { useParams, Routes, Route, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PROJECTS } from 'api/query';
import './Project.scss';
import ProjectTabs from 'components/ProjectTabs/ProjectTabs.lazy';
import Column from 'components/Column/Column.lazy';
import Overview from 'components/Overview/Overview.lazy';
import TasksList from 'components/TasksList/TasksList.lazy';
import Board from 'components/Board/Board.lazy';
import Graphs from 'components/Graphs/Graphs.lazy';

interface ProjectProps {}
export const Project: FC<ProjectProps> = () => {
  const {id} = useParams();

  const { loading, error, data } = useQuery(PROJECTS.getOne, {
    variables: { getProjectId: id }
  });

  const [activeTab, setActiveTab] = useState('tab0');
  const handleClick = (id: string) => {
    setActiveTab(id);
  }

  const listTab = [
    { title: 'Overview'},
    { title: 'Task\'s list'},
    { title: 'Board'},
    { title: 'Graphs'},
  ];

  return (
    <div className="content">
      <div className="header">
        {/* Navbar to add */}
      </div>
      <div className="content-wrapper">
        <div className="flex gap-5">
          {listTab.map((el, key) => (
            <ProjectTabs
              key={key}
              title={el.title}
              id={'tab' + (key)}
              activeTab={activeTab}
              setActiveTab={handleClick}
            />
          ))}
        </div>
        <div>
          {activeTab === 'tab0' && !loading ? <Overview project={data} /> : ''}
          {activeTab === 'tab1' && !loading ? <TasksList project={data} /> : ''}
          {activeTab === 'tab2' && !loading ? <Board project={data} /> : ''}
          {activeTab === 'tab3' && !loading ? <Graphs project={data}/> : ''}
        </div>
      </div>
    </div>
  );
};

export default Project;