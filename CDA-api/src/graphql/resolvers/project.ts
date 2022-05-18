
import { IProject, ProjectModel } from '../../schemas/project.schemas';

export default {
    Query: {
        getProjects: async () => await ProjectModel.find({}),
        getProject: async (_:ParentNode, args: {id: String}) => await ProjectModel.findById({_id: args.id}) 
    },
    Mutation: {
        addProject: async ( _ :ParentNode, args: IProject ) => {
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
        updateProject: async (_:ParentNode, args: {id: String}) => {
            try {
                const newProject = await ProjectModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return newProject
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    }
}