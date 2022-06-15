/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import HeaderMain from 'components/HeaderMain/HeaderMain';
import './ProjectForm.scss';
import InputBasic from 'components/InputBasic/InputBasic';
import BasicButton from 'components/BasicButton/BasicButton';

interface ProjectFormProps {}

const ProjectForm: FC<ProjectFormProps> = () => {
  return (
    <div className="w-10/12 p-6 max-h-screen flex flex-col justify-start items-start">
      <HeaderMain />
      <h1 className=" text-3xl my-4 text-primary font-medium flex">Project informations</h1>
      <form action="" className="w-full mb-6">
        <section id="left" className="w-3/6 pr-4 space-y-4">
          <InputBasic type="text" placeholder="Project name" label="description" required />
          <InputBasic
            type="textarea"
            placeholder="Describe your project"
            label="Project name"
            required
          />
          <InputBasic type="date" label="due date" />
        </section>
        <section id="right"></section>
      </form>
      <span className="w-full text-center">
        <BasicButton
          content="Create"
          type="submit"
          onClick={() => console.log('Project created')}
        />
      </span>
    </div>
  );
};

export default ProjectForm;
