import {Schema, model, Document, Types} from 'mongoose'

export interface INotification extends Document {
    message: String,
    createdAt: Date,
    typeOfNotif: String
    task?:Types.ObjectId,
    project?:Types.ObjectId,
    notified?:[Types.ObjectId],
}

const NotificationSchema = new Schema<INotification> ({
    message: {type: String},
    createdAt: Date,
    typeOfNotif: {type: String},
    task: {type: Schema.Types.ObjectId, ref:'Task'},
    project: {type: Schema.Types.ObjectId, ref:'Project'},
    notified: [{type: Schema.Types.ObjectId, ref:'User'}],
}, {timestamps: true}) //a-t-on besoin de createdAt et updatedAt ??

export const NotificationModel = model<INotification>('Notification', NotificationSchema)