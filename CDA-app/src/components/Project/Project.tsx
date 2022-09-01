import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PROJECTS } from 'api/query';
import './Project.scss';

interface ProjectProps {}
export const Project: FC<ProjectProps> = () => {
  const {id} = useParams();

  const { loading, error, data } = useQuery(PROJECTS.getOne, {
    variables: { getProjectId: id }
  });

  console.log(data)
  return (
    <div >
        <h1>Coucou { id }</h1>
    </div>
  );
};

export default Project;