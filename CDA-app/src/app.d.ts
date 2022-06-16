type Status = 'not_started' | 'in_progress' | 'late' | 'done' | 'archived';

interface IProject {
  _id: string;
  name: string;
  description: string;
  status: Status;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  tasks?: [string];
  team: {
    projectManager?: string;
    developpers?: [string];
  };
}
