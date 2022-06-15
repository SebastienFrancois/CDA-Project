/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState } from 'react';
// eslint-disable-next-line import/named
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import HeaderMain from 'components/HeaderMain/HeaderMain';
import './ProjectForm.scss';
import InputBasic from 'components/InputBasic/InputBasic';
import BasicButton from 'components/BasicButton/BasicButton';
import { PROJECTS } from 'api/query';
import { useNavigate } from 'react-router-dom';

interface ProjectFormProps {}

type FormValues = {
  name: string;
  description: string;
  dueDate: string;
};
const ProjectForm: FC<ProjectFormProps> = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const [gError, setgError] = useState<string>('');
  const [addProject, { data, loading, error }] = useMutation(PROJECTS.add);
  if (error) setgError(error.message);

  const onSubmit: SubmitHandler<FormValues> = (formState) => {
    addProject({ variables: formState })
      .then((d) => {
        if (d) {
          alert(JSON.stringify(d));
        }
        navigate('/');
      })
      .catch((err) => setgError(err.message));
  };

  return (
    <div className="w-10/12 p-6 max-h-screen flex flex-col justify-start items-start">
      <HeaderMain />
      <h1 className=" text-3xl my-4 text-primary font-medium flex">Project informations</h1>
      {gError && <span className="w-full text-left text-red-600">{gError}</span>}
      <form className="w-full mb-6" onSubmit={handleSubmit(onSubmit)}>
        <section id="left" className="w-3/6 pr-4 space-y-4">
          <InputBasic
            type="text"
            name="name"
            placeholder="Project name"
            label="Project name"
            required
            register={register}
          />
          <InputBasic
            type="textarea"
            name="description"
            placeholder="Describe your project"
            label="description"
            required
            register={register}
          />
          <InputBasic type="date" label="due date" name="dueDate" required register={register} />
        </section>
        <section id="right"></section>
        <span className="w-full text-center">
          <BasicButton content="Create" type="submit" onClick={() => null} />
        </span>
      </form>
    </div>
  );
};

export default ProjectForm;
