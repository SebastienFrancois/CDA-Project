import React, { FC } from 'react';
import './ProjectTabs.scss';

export interface ProjectTabsProps {title: string, id: string, activeTab: string, setActiveTab: any }


const ProjectTabs: FC<ProjectTabsProps> = ({title, id, activeTab, setActiveTab}) => (
  <div className={id == activeTab ? "rounded p-3 bg-primary text-white" : "rounded bg-gray-100 hover:bg-primary hover:text-white transition-all ease-in-out p-3"} onClick={() => setActiveTab(id)}>
    {title}
  </div>
);

export default ProjectTabs;
