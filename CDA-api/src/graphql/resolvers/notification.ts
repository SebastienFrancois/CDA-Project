/**
 * message: String,
    createdAt: Date,
    typeOfNotif: String
 */


import { INotification, NotificationModel } from '../../schemas/notification.schema';

export default {
    Query: {
        getNotifications: async () => await NotificationModel.find({}),
        getNotification: async (_:ParentNode, args: {id: String}) => await NotificationModel.findById({_id: args.id}) 
    },
    Mutation: {
        addNotification: async ( _ :ParentNode, args: INotification ) => {
            const newNotification = await NotificationModel.create({
                message: args.message,
                createdAt: args.createdAt,
                typeOfNotif: args.typeOfNotif,
            })
            newNotification.save()
            return newNotification
        },
        deleteNotification : async (_:ParentNode, args: {id: String}) => {
            try {
                await NotificationModel.findOneAndDelete({_id: args.id})
                return JSON.stringify({message:`Instance "${args.id}" has been deleted successfully !`})
            } catch (error) {
                return JSON.stringify({message:` Instance "${args.id}" wasn't deleted !`})
            }
        },
        updateNotification: async (_:ParentNode, args: {id: String}) => {
            try {
                const updatedNotification = await NotificationModel.findByIdAndUpdate({_id: args.id}, args, {new: true});
                return updatedNotification
            } catch (error) {
                return JSON.stringify(`Instance "${args.id}" wasn't updated !`)
            }
        },
    }
}