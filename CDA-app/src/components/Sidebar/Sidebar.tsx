import React, { FC } from 'react';
import './Sidebar.scss';

interface SidebarProps {
  projects: {
    getProjects: {
      _id: string;
      name: string;
      description: string;
      status: string;
      dueDate: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <nav className="Sidebar bg-primary h-full flex flex-col justify-between p-3">
      <div>
        <img src="" alt="LOGO" />
        <hr className="border-0 h-0.5 max-h-px bg-secondary" />
        <div>
          <h2 className="text-secondary text-2xl font-bold my-4">
            <a href="#">Dashboard</a>
          </h2>
        </div>
        <hr className="border-0 h-0.5 max-h-px bg-secondary" />
        <div className="mb-5">
          <h2 className="text-secondary text-2xl font-bold my-4">Projects</h2>
          <ul>
            {props.projects.getProjects.map((project: any, key: any) => {
              return (
                <li className="my-2" key={project._id}>
                  <a className="text-white text-lg" href="#">
                    {project.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="border-0 h-0.5 max-h-px bg-secondary" />
        <div>
          <h2 className="text-secondary text-2xl font-bold my-4">
            <a href="#">Users</a>
          </h2>
        </div>
        <hr className="border-0 h-0.5 max-h-px bg-secondary" />
        <div>
          <h2 className="text-secondary text-2xl font-bold my-4">
            <a href="#">Admnistration</a>
          </h2>
        </div>
      </div>
      <div>
        <a href="#" className="text-white">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
