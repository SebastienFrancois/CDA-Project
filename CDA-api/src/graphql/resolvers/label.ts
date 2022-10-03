import errorHandler from '../../../utils/errorHandler';
import { ILabel, LabelModel, validateLabel } from '../../schemas/label.schemas';
import { AuthenticationError } from 'apollo-server-express';

export default {
    Query: {
        getLabels: async (_:ParentNode, args: any,context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            return await LabelModel.find({})
        },
        getLabel: async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');
            return await LabelModel.findById({_id: args.id})
        }
    },
    Mutation: {
        addLabel: async ( _ :ParentNode, args: ILabel, context: {user: {id: string}} ) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            const err = validateLabel(args);
            if (err.error) return err.error

            const newLabel = await LabelModel.create({
                name: args.name,
                color: args.color,
            })
            newLabel.save()
            return newLabel
        },
        deleteLabel : async (_:ParentNode, args: {id: String}, context: {user: {id: string}}) => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            try {
                await LabelModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateLabel: async (_:ParentNode, args: ILabel, context: {user: {id: string}})   => {
            if(!context.user) throw new AuthenticationError('Invalid token');

            try {
                const updatedLabel = await LabelModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return updatedLabel
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    }
}