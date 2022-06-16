import { model, Schema, Document, Types} from 'mongoose'
import Joi from 'joi';

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

export const CommentModel = model<IComment>('Comment', CommentSchema);

export const validateComment = (comment: IComment) => {
    var schema = Joi.object().keys({
      message: Joi.string().trim().required().messages({
        'string.empty': `"message" ne peut etre vide`,
        'any.required': `"message" est requis`
      }),
      sentAt: Joi.date().required().messages({
        'any.required': `"dueDate" ne peut etre vide`
      }),
      //sentBy : ....
      project: Joi.string().trim().required().messages({
        'string.empty': `"project" ne peut etre vide`,
        'any.required': `"project" est requis`
      }),
    });
    return schema.validate(comment, {abortEarly:false});
  };