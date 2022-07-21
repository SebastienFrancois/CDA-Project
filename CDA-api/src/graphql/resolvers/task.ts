
import { Types } from 'mongoose';
import { LabelModel } from '../../schemas/label.schemas';
import { ProjectModel } from '../../schemas/project.schemas';
import { ITask, TaskModel, validateTask } from '../../schemas/task.schemas';
import Joi from 'joi';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        getTasks: async ( _ :ParentNode, args: any,context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            //verifie que l'utilisateur et bien assigné au project rattacher a cette tache.
            //if(project.team.!includes(context.user.id)) throw new AuthenticationError('Invalid role');
            return await TaskModel.find({})
        },   
        getTask: async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            //verifie que l'utilisateur et bien assigné au project rattacher a cette tache.
            //if(project.team.!includes(context.user.id)) throw new AuthenticationError('Invalid role');
            return await TaskModel.findById({_id: args.id})
        }
    },
    Mutation: {
        addTask: async ( _ :ParentNode, args: ITask, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            // verifier permission chef de projet ??

            // const err = await validateTask(args);
            // if (err.error) return err.error

            const newTask = await TaskModel.create({
                name: args.name,
                description: args.description,
                status: args.status,
                dueDate: args.dueDate,
                labels: args.labels,
                project: args.project
            })
            newTask.save()
            return newTask
        },
        deleteTask : async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            // verifier permission chef de projet ??

            try {
                await TaskModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateTask: async (_:ParentNode, args: ITask, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            try {
                const updatedTask = await TaskModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return updatedTask
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    },
    Task: {
        labels: async (task: ITask, _: ParentNode) => {
            return task.labels.map(async (labelId : Types.ObjectId) => {
                console.log(labelId);
                return await LabelModel.findById({_id: labelId})
            })
        },
        project: async (task: ITask, _: ParentNode) => {
            return await ProjectModel.findById(task.project)
        }
    }
}