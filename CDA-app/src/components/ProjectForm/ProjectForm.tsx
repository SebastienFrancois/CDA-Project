import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import HeaderMain from 'components/HeaderMain/HeaderMain';
import './ProjectForm.scss';

interface ProjectFormProps {}

const ProjectForm: FC<ProjectFormProps> = () => (
  <div className="w-10/12 p-6 h-full flex flex-col justify-start items-start">
    <HeaderMain />
  </div>
);

export default ProjectForm;
