import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import './Project.scss';

interface ProjectProps {}
export const Project: FC<ProjectProps> = () => {

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  return (
    <div >
        <h1>Coucou {id}</h1>
    </div>
  );
};

export default Project;