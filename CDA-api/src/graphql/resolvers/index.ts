import userResolvers from './user';
import projectResolvers from "./project";
import taskResolvers from './task'
import labelResolvers from './label'
import notificationResolvers from './notification'
import commentResolvers from './comment'

export default {
  Query: {
    ...userResolvers.Query,
    ...projectResolvers.Query,
    ...taskResolvers.Query,
    ...labelResolvers.Query,
    ...notificationResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...projectResolvers.Mutation,
    ...taskResolvers.Mutation,
    ...labelResolvers.Mutation,
    ...notificationResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Task : {
    ...taskResolvers.Task
  },
  Project: {
    ...projectResolvers.Project
  },
  Comment: {
    ...commentResolvers.Comment
  }
};