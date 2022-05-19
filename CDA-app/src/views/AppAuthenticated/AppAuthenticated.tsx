import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
// import axios from 'axios';
import { appContainer } from '../../App.style';
import ProjectCard from '../../components/ProjectCard/ProjectCard.lazy';
import { gql, useQuery } from '@apollo/client'
import Sidebar from '../../components/Sidebar/Sidebar.lazy'

interface AppAuthenticatedProps {}

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

const AppAuthenticated: FC<AppAuthenticatedProps> = () => {
  // axios.defaults.baseURL = 'http://localhost:5000/api/';
  const { loading, error, data } = useQuery(PROJECTS);
  console.log(data);

  // data.getProjects.map((el: any) => console.log(el))  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  

  return (
    <div className={appContainer}>
      <div className="h-full"></div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="w-2/12 h-full">
                <Sidebar projects={data} />
              </div>
              <div className="w-10/12 h-full flex justify-center items-center">
                <div className="flex flex-wrap gap-5">
                  {data.getProjects.map((project: any, key: any) =>
                    <ProjectCard
                      key = {project._id}
                      name={project.name}
                      status={project.status}
                      dueDate={project.dueDate}
                    />
                  )}
                </div>
              </div>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
