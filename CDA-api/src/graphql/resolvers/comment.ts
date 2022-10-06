import { IComment, CommentModel, validateComment } from '../../schemas/comment.schemas';
import { AuthenticationError } from 'apollo-server-express';
import { TaskModel } from '../../schemas/task.schemas';
import { UserModel } from '../../schemas/user.schemas';
import { TUser } from '../../../appolo-server';

export default {
    Query: {
        getComments: async (_:ParentNode, args: any, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            return await CommentModel.find({})
        },
        getComment: async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            return await CommentModel.findById({_id: args.id}) 
        }
    },
    Comment: {
        // I DONT FUCKING UNDERSTAND THIS :::: HERE LIES THE END OF TIMES ::::
        // sentBy: async (comment: IComment, _:ParentNode) => {
        //     console.log("sentBy", comment.sentBy)
        //     try {
        //         const user = await UserModel.findById(comment.sentBy)
        //         return user
        //     } catch (error) {
        //         console.error('no user found')
        //     }
        // },
        // task: async (comment: IComment, _:ParentNode) => {
        //     console.log("first")
        //    return await TaskModel.findById(comment.task?._id)
            
        // },
        // sentAt: (comment: IComment) => {
        //     console.log('HAHAHAHAHAHHAHAHAHA I DARE YOU')
        //     return comment.sentAt
        // }
    },
    Mutation: {
        addComment: async ( _ :ParentNode, args: IComment, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            // const err = await validateComment(args);
            // if (err.error) return err.error
            // const user = UserModel.findById({id: context.user.id})

            const newComment = await CommentModel.create({
                message: args.message,
                sentAt: new Date(),
                sentBy: context.user.id,
                task: args.task,
            })
            newComment.save()
            return newComment
        },
        deleteComment : async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            try {
                await CommentModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateComment: async (_:ParentNode, args: IComment, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            // const err = await validateComment(args);
            // if (err.error) return err.error

            try {
                const updatedComment = await CommentModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return updatedComment
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    },
};