type Status = 'not_started' | 'in_progress' | 'late' | 'done' | 'archived';

interface IProject {
  _id: string;
  name: string;
  description: string;
  status: Status;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  tasks?: ITask[];
  team: {
    projectManager?: string;
    developpers?: [string];
  };
}

type TaskStatus = 'backlog' | 'in progress' | 'in review' | 'done';

interface ITask {
  _id: string;
  name: string;
  description: string;
  status?: TaskStatus;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  labels: [ILabel];
  // assignTo: [Types.ObjectId],
  project: string | undefined;
  // comments: [Types.ObjectId]
}

interface ILabel {
  _id: string;
  name: string;
  color: string;
}
