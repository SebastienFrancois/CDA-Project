import { Schema, model, Document, Types } from 'mongoose';
import Joi from 'joi';

export enum Status {
    not_started,
    in_progress,
    late,
    done,
}

export interface IProject extends Document {
    name: String,
    description: String,
    status?: Status,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,
    tasks?: [Types.ObjectId],
    projectManager?: Types.ObjectId | undefined,
    developpers?: [Types.ObjectId] | undefined,
}

const ProjectSchema = new Schema<IProject>({
  name: {type: String, unique: true, maxlength: 255},
  description: {type: String, maxlength: 255},
  status: {type: String, enum: ['not started','in progress','late', 'done', ], default: 'not started'},
  dueDate: Date,
  tasks: [{type: Schema.Types.ObjectId, ref:'Task'}],
  projectManager: {type: Schema.Types.ObjectId, ref:'user'},
  developpers: [{type: Schema.Types.ObjectId, ref:'user'}]
}, {timestamps: true})

export const ProjectModel = model<IProject>('Project', ProjectSchema)

export const validateProject = (project: IProject) => {
  const schema = Joi.object().keys({
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
    projectManager: Joi.string(),
    developpers: Joi.array().items(Joi.string()),
  });
  return schema.validate(project, {abortEarly:false});
};
