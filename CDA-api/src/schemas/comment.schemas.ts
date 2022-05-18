import { model, Schema, Document, Types} from 'mongoose'

export interface IComment extends Document {
    message: String,
    sentAt: Date,
    sentBy: Types.ObjectId,
    task: Types.ObjectId,
}

const CommentSchema = new Schema<IComment> ({
    message: {type: String},
    sentAt: Date,
    sentBy: {type: Schema.Types.ObjectId, ref:'User'},
    task: {type: Schema.Types.ObjectId, ref:'Task'},
}, {timestamps: true}) //a-t-on besoin de createdAt et updatedAt ??

export const CommentModel = model<IComment>('Comment', CommentSchema)