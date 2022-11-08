import { IComment, CommentModel, validateComment } from '../../schemas/comment.schemas';
import { AuthenticationError } from 'apollo-server-express';
import { TaskModel } from '../../schemas/task.schemas';
import { UserModel } from '../../schemas/user.schemas';
import { TUser } from '../../../appolo-server';
import hasPermissions from '../../../utils/userInfos';
import { Types } from 'mongoose';

export default {
    Query: {
        getComments: async (_:ParentNode, args: any, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            if(!hasPermissions(context.user, 'getComments'))  throw new AuthenticationError("Not authorized");

            return await CommentModel.find({})
        },
        getComment: async (_:ParentNode, args: {id: String}, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            if(!hasPermissions(context.user, 'getComment'))  throw new AuthenticationError("Not authorized");

            return await CommentModel.findById({_id: args.id}) 
        }
    },
    Mutation: {
        addComment: async ( _ :ParentNode, args: IComment, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            if(!hasPermissions(context.user, 'addComment'))  throw new AuthenticationError("Not authorized");
            
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
        deleteComment : async (_:ParentNode, args: {id: String}, context: {user: TUser}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            
            if(!hasPermissions(context.user, 'deleteComment'))  throw new AuthenticationError("Not authorized");
            
            const DeleteTarget =  await CommentModel.findById({_id: args.id})

            if(!DeleteTarget) throw new Error('Comment not found');

            const isOwner = DeleteTarget.sentBy?.toString() === context.user.id ;

            if(isOwner || context.user.role == "ADMIN"){
                try {
                    await CommentModel.findOneAndDelete({_id: args.id})
                    return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
                } catch (error) {
                    return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
                }
            }

            throw new AuthenticationError('You cannot delete other users comments');
        },
        updateComment: async (_:ParentNode, args: IComment, context: {user: TUser}) => {
            // if (err.error) return err.error
            // const err = await validateComment(args);
            if(!context.user) throw new AuthenticationError('Invalid token');
            
            if(!hasPermissions(context.user, 'updateComment'))  throw new AuthenticationError("Not authorized");


            const UpdateTarget =  await CommentModel.findById({_id: args.id})

            if(!UpdateTarget) throw new Error('Comment not found');

            const isOwner = UpdateTarget.sentBy?.toString() === context.user.id ;

            if(isOwner){
                try {
                    const updatedComment = await CommentModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                    return updatedComment
                } catch (error) {
                    return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
                }
            }

            throw new AuthenticationError('You cannot modify other users comments');
            
        },
    },
    Comment: {
        sentBy: async (comment: IComment, _:ParentNode) => {
            console.log("sentBy", comment.sentBy)
            try {
                const user = await UserModel.findById(comment.sentBy)
                return user
            } catch (error) {
                console.error('no user found')
            }
        },
        task: async (comment: IComment, _:ParentNode) => {
           return await TaskModel.findById(comment.task?._id)
            
        },
        sentAt: (comment: IComment) => {
            return comment.sentAt
        }
    },
};