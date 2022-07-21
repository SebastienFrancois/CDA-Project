import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../../assets/png/SimplePlan.png';
import './Sidebar.scss';

export interface SidebarProps {
  projects: {
    getProjects: [IProject];
  };
}

const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <>
      <div className="w-2/12 h-full">
        <nav className="Sidebar bg-primary h-full flex flex-col justify-between p-3">
          <div>
            <img src={Logo} alt="LOGO" className="m-auto w-28 h-auto object-cover" />
            <hr className="border-0 h-0.5 max-h-px bg-secondary" />
            <div>
              <h2 className="text-secondary text-2xl font-bold my-4">
                <NavLink to="/">Dashboard</NavLink>
              </h2>
            </div>
            <hr className="border-0 h-0.5 max-h-px bg-secondary" />
            <div className="mb-5">
              <h2 className="text-secondary text-2xl font-bold my-4">Projects</h2>
              <ul>
                {props.projects
                  ? props.projects.getProjects.map((project) => {
                      return (
                        <li className="my-2" key={project._id}>
                          <a className="text-white text-lg" href="#">
                            {project.name}
                          </a>
                        </li>
                      );
                    })
                  : ''}
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
      </div>
      <div className="w-10/12 p-6 h-full flex flex-col justify-start items-start overflow-y-scroll overflow-x-hidden scroll-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
