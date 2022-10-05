
import { IProject, ProjectModel, validateProject } from '../../schemas/project.schemas';
import { TaskModel } from '../../schemas/task.schemas';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';
import { UserModel } from '../../schemas/user.schemas';
import hasPermissions from '../../../utils/userInfos';
import { TUser } from '../../../appolo-server';
export default {
    Query: {
        getProjects: async (_:ParentNode, __: any, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'getProjects'))  throw new AuthenticationError("Not authorized");

            // fetch all the projects
            let projects = await ProjectModel.find({});
            if(!projects) return [];
            
            // if user has a role ADMIN, send all the projects
            if (context.user.role == "ADMIN") return projects;

            // if user has another role, send only the projects where he/she is on the team
            if (projects.length > 0 ) {
                return projects.filter(project =>  {
                     const isDev = project.developpers && project.developpers.includes(context.user.id as unknown as Types.ObjectId) 
                     const isPm = project?.projectManager?.toString() === context.user.id.toString()
                     return  isDev || isPm;
                })
            }
            
        } ,
        getProject: async (_:ParentNode, args: {id: string}, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'getProject'))  throw new AuthenticationError("Not authorized");

            const project = await ProjectModel.findById({_id: args.id});

            if(!project) throw new Error('Project not found !')

            if (context.user.role == "ADMIN") return project

            const isDev = project?.developpers && project?.developpers.includes(context.user.id as unknown as Types.ObjectId) 
            const isPm = project?.projectManager?.toString() === context.user.id.toString()
            const partOfteam =  isDev || isPm;

            if(!partOfteam) throw new AuthenticationError("Not authorized");

            return project
        } 
    },
    Mutation: {
        addProject: async ( _ :ParentNode, args: IProject, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'addProject'))  throw new AuthenticationError("Not authorized");

            // get errors from Joi
            const err = validateProject(args);
            if (err.error) return err.error;

            // if User is not an admin, he/she can't add a project
            if (context.user.role != "ADMIN") return new ApolloError("Not authorized");

            const newProject = await ProjectModel.create({
                            name: args.name,
                            description: args.description,
                            status: args.status,
                            dueDate: args.dueDate,
                            projectManager: args.projectManager,
                            developpers: args.developpers,
                        })
            newProject.save()
            return newProject;
        },
        deleteProject : async (_:ParentNode, args: {id: string}, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'deleteProject'))  throw new AuthenticationError("Not authorized");

            // if User is not an admin, he/she can't delete a project
            if (context.user.role != "ADMIN") return new ApolloError("Not authorized");

            try {
                await ProjectModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateProject: async (_:ParentNode, args: IProject, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'updateProject'))  throw new AuthenticationError("Not authorized");

            try {
                const newProject = await ProjectModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return newProject
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    },
    Project: {
        tasks: async (project: IProject, _:ParentNode) => {
            const result = await TaskModel.find({project: project._id})
            return result
        },
        projectManager: async (project: IProject, _:ParentNode) => {
            const manager = await UserModel.findById(project?.projectManager)
            return manager
        },
        developpers: async (project: IProject, _:ParentNode) => {
            const devs = project?.developpers?.map(async (id : Types.ObjectId) => {
                return await UserModel.findById({_id: id})
            })
            return devs
        },
}}