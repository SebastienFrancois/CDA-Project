import { IComment, CommentModel } from '../../schemas/comment.schemas';

export default {
    Query: {
        getComments: async () => await CommentModel.find({}),
        getComment: async (_:ParentNode, args: {id: String}) => await CommentModel.findById({_id: args.id}) 
    },
    Mutation: {
        addComment: async ( _ :ParentNode, args: IComment ) => {
            const newComment = await CommentModel.create({
                message: args.message,
                sentAt: new Date(),
                // sentBy: ,
                // Task: ,
            })
            newComment.save()
            return newComment
        },
        deleteComment : async (_:ParentNode, args: {id: String}) => {
            try {
                await CommentModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateComment: async (_:ParentNode, args: {id: String}) => {
            try {
                const updatedComment = await CommentModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return updatedComment
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    }
}