
import { Types } from 'mongoose';
import { LabelModel } from '../../schemas/label.schemas';
import { ProjectModel } from '../../schemas/project.schemas';
import { ITask, TaskModel } from '../../schemas/task.schemas';

export default {
    Query: {
        getTasks: async () => await TaskModel.find({}),
        getTask: async (_:ParentNode, args: {id: String}) => await TaskModel.findById({_id: args.id}) 
    },
    Mutation: {
        addTask: async ( _ :ParentNode, args: ITask ) => {
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
        deleteTask : async (_:ParentNode, args: {id: String}) => {
            try {
                await TaskModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateTask: async (_:ParentNode, args: {id: String}) => {
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