import { IComment, CommentModel, validateComment } from '../../schemas/comment.schemas';
import Joi from 'joi';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        getComments: async (context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            await CommentModel.find({})
        },
        getComment: async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            await CommentModel.findById({_id: args.id}) 
        }
    },
    Mutation: {
        addComment: async ( _ :ParentNode, args: IComment, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            // const err = await validateComment(args);
            // if (err.error) return err.error

            const newComment = await CommentModel.create({
                message: args.message,
                sentAt: new Date(),
                // sentBy: ,
                Task: args.task,
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
    }
}