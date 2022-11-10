/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState } from 'react';
// eslint-disable-next-line import/named
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import HeaderMain from './../../components/HeaderMain/HeaderMain';
import './ProjectForm.scss';
import InputBasic from './../../components/InputBasic/InputBasic';
import BasicButton from './../../components/BasicButton/BasicButton';
import { PROJECTS, USERS } from './../../api/query';
import dayjs from 'dayjs';
import DevCheckbox from '../../components/DevCheckbox/DevCheckbox';
import ManagerSelect from './../../components/ManagerSelect/ManagerSelect';

interface ProjectFormProps {}

type FormValues = {
  name: string;
  description: string;
  dueDate: string | number;
  projectManager?: string;
  developpers?: string[];
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location: LocationParams<any> = useLocation();

  const { update, item } = location.state;

  const [developpers, setDeveloppers] = useState<string[]>(
    update && item ? item?.developpers.map((dev: any) => dev._id) : null,
  );

  const [manager, setManager] = useState(update && item ? item.projectManager._id : null);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues:
      update && item
        ? {
            name: item.name,
            description: item.description,
            dueDate: dayjs(Number(item.dueDate)).format('YYYY-MM-DD'),
            projectManager: item.manager,
            developpers: item.developpers,
          }
        : {},
  });
  const [gError, setgError] = useState<string>('');
  const [addProject] = useMutation(PROJECTS.add);
  const [updateProject] = useMutation(PROJECTS.update);
  const { data } = useQuery(USERS.get);

  const onSubmit: SubmitHandler<FormValues> = (formState) => {
    if (update && item._id) {
      return updateProject({
        variables: {
          updateProjectId: item._id,
          ...formState,
          developpers,
          projectManager: manager,
        },
        refetchQueries: 'active',
      })
        .then(() => {
          navigate('/dashboard');
        })
        .catch((err) => alert(JSON.stringify(err)));
    }
    return addProject({
      variables: { ...formState, developpers, projectManager: manager },
      refetchQueries: 'active',
    })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => setgError(err.message));
  };

  return (
    <>
      <HeaderMain />
      <form className="w-full mb-3" onSubmit={handleSubmit(onSubmit)}>
        {gError && <span className="w-full text-left text-red-600 my-2 ">{gError}</span>}
        <div className="flex gap-3">
          <section id="left" className="w-3/6 pr-4 space-y-4">
            <h2 className=" text-3xl my-4 text-primary font-medium flex">Project informations</h2>
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
          <section id="right" className="w-3/6 pr-4 flex flex-col">
            <h2 className=" text-3xl my-4 text-primary font-medium flex">Assign Team</h2>
            <div className="flex flex-col justify-between grow gap-4">
              <ManagerSelect data={data} manager={manager} setManager={setManager} />
              <div className="grow flex flex-col">
                <label
                  className={`text-medium font-medium first-letter:capitalize ${'text-slate-700'}`}
                >
                  Developper team *
                </label>
                <DevCheckbox
                  developpers={developpers}
                  setDeveloppers={setDeveloppers}
                  data={data}
                />
              </div>
            </div>
          </section>
        </div>
        <span className="w-full h-auto m-8 flex justify-center align-middle">
          <BasicButton content={update ? 'Update' : 'Create'} type="submit" onClick={() => null} />
        </span>
      </form>
    </>
  );
};

export default ProjectForm;
