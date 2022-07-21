
import { IProject, ProjectModel, validateProject } from '../../schemas/project.schemas';
import { TaskModel } from '../../schemas/task.schemas';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

// { $or: [
//     {team: { developpers: [context.user.id]}},
//     {team: { projectManager: context.user.id}}
// ]} 
export default {
    Query: {
        getProjects: async (_:ParentNode, __: any, context: {user: {id: Types.ObjectId, role: string}}) => {
            if (!context.user) throw new AuthenticationError('Invalid token');
            let projects = await ProjectModel.find({});
            if (context.user && context.user.role == "ADMIN") {
                return projects;
            }
            if (projects.length > 0 ){
                projects = projects.filter(project =>  {
                     const devs = project.team.developpers;
                     const pm = project.team.projectManager;
                     return devs && devs.includes(context.user.id) ||  pm === context.user.id
                 })
             }
            return projects
        } ,
        getProject: async (_:ParentNode, args: {id: String}) => await ProjectModel.findById({_id: args.id}) 
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