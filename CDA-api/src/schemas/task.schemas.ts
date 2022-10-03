import mongoose from 'mongoose';
import { Schema, model, Document, Types } from 'mongoose';
import Joi from 'joi';

export enum Status {
    backlog,
    'in progress',
    'in review',
    done,
}

export interface ITask extends Document {
    name: String,
    description: String,
    status?: Status,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
    labels: [Types.ObjectId],
    // assignTo: [Types.ObjectId],
    project: Types.ObjectId | undefined,
    // comments: [Types.ObjectId]
}

const TaskSchema = new Schema<ITask>({
  name: {type: String, unique: true, maxlength: 255},
  description: {type: String, maxlength: 255},
  status: {type: String, enum: ['backlog','in progress','in review', 'done', ], default: 'backlog'},
  dueDate: Date,
  labels: [{type: Types.ObjectId, ref:'labels'}],
  project: {type: Types.ObjectId, ref:'projects'}
  // assignTo: [{type: Types.ObjectId, ref:'users'}],
  // comments: [{type: Types.ObjectId, ref:'comments'}]
}, {timestamps: true})

export const TaskModel = model<ITask>('Task', TaskSchema)

export const validateTask = (task: ITask) => {
  var schema = Joi.object().keys({
    name: Joi.string().trim().max(255).required().messages({
      'string.empty': `"name" ne peut etre vide`,
      'string.max': `"name" ne peut etre plus grand que {#limit} caractères`,
      'any.required': `"name" est requis`
    }),
    description: Joi.string().trim().max(255).required().messages({
      'string.empty': `"description" ne peut etre vide`,
      'string.max': `"description" ne peut etre plus grand que {#limit} caractères`,
      'any.required': `"description" est requis`
    }),
    dueDate: Joi.date().required().messages({
      'any.required': `"dueDate" ne peut etre vide`
    }),
    project: Joi.string().trim().required().messages({
      'string.empty': `"name" ne peut etre vide`,
      'any.required': `"name" est requis`
    }),
  });
  return schema.validate(task, {abortEarly:false});
};
