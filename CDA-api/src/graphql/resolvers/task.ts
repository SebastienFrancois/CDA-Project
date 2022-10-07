
import { Types } from 'mongoose';
import { LabelModel } from '../../schemas/label.schemas';
import { ProjectModel } from '../../schemas/project.schemas';
import { ITask, TaskModel, validateTask } from '../../schemas/task.schemas';
import { AuthenticationError } from 'apollo-server-express';
import { TUser } from '../../../appolo-server';
import hasPermissions from '../../../utils/userInfos';

export default {
    Query: {
        getTasks: async ( _ :ParentNode, args: any, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            const tasks = await TaskModel.find({project: args.project_id})
            if(!tasks) return [];

             // if user has a role ADMIN, send all the projects
             if (context.user.role == "ADMIN") return tasks;

            return tasks
        },   
        getTask: async (_:ParentNode, args: {id: String},  context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'getTask'))  throw new AuthenticationError("Not authorized");
   
            const task = await TaskModel.findById({_id: args.id});

            if(!task) throw new Error('Task not found !')

            if(context.user.role !== "ADMIN"){
                await verifyIfIsTeamMember(task.project , context.user)
            }

            return task
        }
    },
    Mutation: {
        addTask: async ( _ :ParentNode, args: ITask,  context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'addTask'))  throw new AuthenticationError("Not authorized");

            // const err = await validateTask(args);
            // if (err.error) return err.error
            if(context.user.role !== "ADMIN"){
                await verifyIfIsTeamMember(args.project , context.user)
            }

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
        deleteTask : async (_:ParentNode, args: {id: String},  context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'deleteTask'))  throw new AuthenticationError("Not authorized");

            const task = await TaskModel.findById({_id: args.id});
            
            if(!task) throw new Error('Task not found !')

            if(context.user.role !== "ADMIN"){
                await verifyIfIsTeamMember(task?.project , context.user)
            }

            try {
                await task?.delete()
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateTask: async (_:ParentNode, args: ITask,  context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'updateTask'))  throw new AuthenticationError("Not authorized");

            const task = await TaskModel.findById({_id: args.id});
            
            if(!task) throw new Error('Task not found !')

            if(context.user.role !== "ADMIN"){
                await verifyIfIsTeamMember(task?.project , context.user)
            }

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
                return await LabelModel.findById({_id: labelId})
            })
        },
        project: async (task: ITask, _: ParentNode) => {
            return await ProjectModel.findById(task.project)
        }
    }
}

async function verifyIfIsTeamMember(project_id : Types.ObjectId | undefined, user: TUser){
    const project = await ProjectModel.findById({_id: project_id})
    const isPm =  project?.projectManager?.toString() === user.id.toString()
    const isDev = project?.developpers && project?.developpers.includes(user.id as unknown as Types.ObjectId) 
    const partOfteam =  isDev || isPm;

    if(!partOfteam) throw new AuthenticationError("Not authorized");
}