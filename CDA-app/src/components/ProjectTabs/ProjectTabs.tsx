import React, { FC } from 'react';
import './ProjectTabs.scss';

export interface ProjectTabsProps {
  title: string;
  id: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const ProjectTabs: FC<ProjectTabsProps> = ({ title, id, activeTab, setActiveTab }) => (
  <div
    className={`rounded cursor-pointer p-3 ${
      id == activeTab
        ? 'bg-primary text-white'
        : 'bg-gray-100 hover:bg-primary hover:text-white transition-all ease-in-out'
    }`}
    onClick={() => setActiveTab(id)}
  >
    {title}
  </div>
);

export default ProjectTabs;
