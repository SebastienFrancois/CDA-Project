/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState } from 'react';
// eslint-disable-next-line import/named
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import HeaderMain from 'components/HeaderMain/HeaderMain';
import './ProjectForm.scss';
import InputBasic from 'components/InputBasic/InputBasic';
import BasicButton from 'components/BasicButton/BasicButton';
import { PROJECTS } from 'api/query';
import dayjs from 'dayjs';

interface ProjectFormProps {}

type FormValues = {
  name: string;
  description: string;
  dueDate: string | number;
};
export interface LocationParams<R> {
  pathname: string;
  state: R;
  search: string;
  hash: string;
  key: string;
}

const ProjectForm: FC<ProjectFormProps> = () => {
  const navigate = useNavigate();
  const location: LocationParams<any> = useLocation();
  const { update, item } = location.state;
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues:
      update && item
        ? {
            name: item.name,
            description: item.description,
            dueDate: dayjs(Number(item.dueDate)).format('YYYY-MM-DD'),
          }
        : {},
  });
  const [gError, setgError] = useState<string>('');
  const [addProject] = useMutation(PROJECTS.add);
  const [updateProject] = useMutation(PROJECTS.update);

  const onSubmit: SubmitHandler<FormValues> = (formState) => {
    if (update && item._id) {
      return updateProject({
        variables: { updateProjectId: item._id, ...formState },
        refetchQueries: 'active',
      })
        .then(() => {
          navigate('/');
        })
        .catch((err) => alert(JSON.stringify(err)));
    }
    return addProject({ variables: formState, refetchQueries: 'active' })
      .then(() => {
        navigate('/');
      })
      .catch((err) => setgError(err.message));
  };

  return (
    <>
      <HeaderMain />
      <h1 className=" text-3xl my-4 text-primary font-medium flex">Project informations</h1>
      {gError && <span className="w-full text-left text-red-600 my-2 ">{gError}</span>}
      <form className="w-full mb-3" onSubmit={handleSubmit(onSubmit)}>
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
            label="Description"
            required
            register={register}
          />
          <InputBasic type="date" label="due date" name="dueDate" required register={register} />
        </section>
        <section id="right"></section>
        <span className="w-full h-auto m-8 flex justify-center align-middle">
          <BasicButton content={update ? 'Update' : 'Create'} type="submit" onClick={() => null} />
        </span>
      </form>
    </>
  );
};

export default ProjectForm;
