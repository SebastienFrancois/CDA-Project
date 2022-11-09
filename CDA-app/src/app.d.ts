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
  projectManager?: IUser;
  developpers?: [IUser];
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
  assignTo: [string];
  project: string | undefined;
  // comments: [Types.ObjectId]
}

interface ILabel {
  _id: string;
  name: string;
  color: string;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  picture?: string;
  preferred_language?: string;
  role?: string;
}

interface IComment {
  _id: string;
  message: string;
  sentAt: Date;
  sentBy: IUser;
}
