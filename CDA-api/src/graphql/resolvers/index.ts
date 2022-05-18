import projectResolvers from "./project";
import taskResolvers from './task'
import labelResolvers from './label'
import notificationResolvers from './notification'
import commentResolvers from './comment'

export default {
  Query: {
    ...projectResolvers.Query,
    ...taskResolvers.Query,
    ...labelResolvers.Query,
    ...notificationResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...projectResolvers.Mutation,
    ...taskResolvers.Mutation,
    ...labelResolvers.Mutation,
    ...notificationResolvers.Mutation,
    ...commentResolvers.Mutation,
  }
};