import React, { createContext, ReactChild, useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { PROJECTS, TASKS } from './../api/query';

interface ProjectContextInterface {
  project: IProject | null;
  updateTaskHandler: () => void;
  addTask: () => void;
  removeTask: () => void;
  setProject: any;
}

export const ProjectContext = createContext<ProjectContextInterface>({
  project: null,
  updateTaskHandler: () => {},
  addTask: () => {},
  removeTask: () => {},
  setProject: () => {},
});

export function ProjectContextProvider({ children }: { children: ReactChild }) {
  const [project, setProject] = useState<IProject | null>(null);
  const [updateTask] = useMutation(TASKS.update);

  function updateTaskHandler() {
    updateTask({
      variables: {
        //   updateTaskId: task._id,
        //   name: taskName,
        //   status: taskStatus,
        //   description: taskDescription,
        //   dueDate: taskDueDate,
        //   labels: labelsToUpdate,
      },
      refetchQueries: 'active',
    });
  }
  function addTask() {}
  function removeTask() {}
  function handleSetProject(newProject: IProject) {
    setProject(newProject);
  }

  useEffect(() => {
    setProject(project);
  }, [project]);

  const value = {
    updateTaskHandler,
    addTask,
    removeTask,
    project,
    setProject: handleSetProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
