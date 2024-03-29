
import { IProject, ProjectModel, validateProject } from '../../schemas/project.schemas';
import { TaskModel } from '../../schemas/task.schemas';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export default {
    Query: {
        getProjects: async (_:ParentNode, __: any, context: {user: {id: Types.ObjectId, role: string}}) => {
            // if problem with token stored in context
            if (!context.user) throw new AuthenticationError('Invalid token');

            // fetch all the projects
            let projects = await ProjectModel.find({});

            // if user has a role ADMIN, send all the projects
            if (context.user.role == "ADMIN") return projects;

            // if user has another role, send only the projects where he/she is on the team
            if (projects.length > 0 ) {
                projects = projects.filter(project =>  {
                     const devs = project.team.developpers;
                     const pm = project.team.projectManager;
                     return devs && devs.includes(context.user.id) ||  pm === context.user.id;
                 })
             }
            return projects;
        } ,
        getProject: async (_:ParentNode, args: {id: string}, context: {user: {id: Types.ObjectId}}) => {
            // if problem with token stored in context
            if (!context.user) throw new AuthenticationError('Invalid token');
            return await ProjectModel.findById({_id: args.id})
        } 
    },
    Mutation: {
        addProject: async ( _ :ParentNode, args: IProject, context: {user: {id: Types.ObjectId, role: string}}) => {
            // if problem with token stored in context
            if (!context.user) throw new AuthenticationError('Invalid token');

            // get errors from Joi
            const err = await validateProject(args);
            if (err.error) return err.error;

            // if User is not an admin, he/she can't add a project
            if (context.user.role != "ADMIN") return new ApolloError("Not authorized");

            const newProject = await ProjectModel.create({
                            name: args.name,
                            description: args.description,
                            status: args.status,
                            dueDate: args.dueDate
                        })
            newProject.save()
            return newProject;
        },
        deleteProject : async (_:ParentNode, args: {id: string}, context: {user: {id: Types.ObjectId, role: string}}) => {
            // if problem with token stored in context
            if (!context.user) throw new AuthenticationError('Invalid token');

            // if User is not an admin, he/she can't delete a project
            if (context.user.role != "ADMIN") return new ApolloError("Not authorized");

            try {
                await ProjectModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateProject: async (_:ParentNode, args: IProject, context: {user: {id: Types.ObjectId, role: string}}) => {
            // if problem with token stored in context
            if (!context.user) throw new AuthenticationError('Invalid token');

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
        }
    }
}