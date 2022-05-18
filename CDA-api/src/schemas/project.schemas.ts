import { Schema, model, Document } from 'mongoose';

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
}

const ProjectSchema = new Schema<IProject>({
  name: {type: String, unique: true, maxlength: 255},
  description: {type: String, maxlength: 255},
  status: {type: String, enum: ['not started','in progress','late', 'done', ], default: 'not started'},
  dueDate: Date
}, {timestamps: true})

export const ProjectModel = model<IProject>('Project', ProjectSchema)
