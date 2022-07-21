
import { IProject, ProjectModel, validateProject } from '../../schemas/project.schemas';
import { TaskModel } from '../../schemas/task.schemas';
import Joi from 'joi';
import { AuthenticationError } from 'apollo-server-express';
import { retrieveUser } from '../../../utils/userInfos';
import user from './user';

export default {
    Query: {
        getProjects: async (_:ParentNode, args: any, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            return await ProjectModel.find({})  
        } ,
        getProject: async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            return await ProjectModel.findById({_id: args.id}) 
        }
    },
    Mutation: {
        addProject: async ( _ :ParentNode, args: IProject ) => {
            const err = await validateProject(args);
            if (err.error) return err.error

            const newProject = await ProjectModel.create({
                name: args.name,
                description: args.description,
                status: args.status,
                dueDate: args.dueDate
            })
            newProject.save()
            return newProject
        },
        deleteProject : async (_:ParentNode, args: {id: String}) => {
            try {
                await ProjectModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateProject: async (_:ParentNode, args: IProject) => {

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
            console.log("coucou",project);
            const result = await TaskModel.find({project: project._id})
            return result
        }
    }
}