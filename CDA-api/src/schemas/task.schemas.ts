import mongoose from 'mongoose';
import { Schema, model, Document, Types } from 'mongoose';

export enum Status {
    not_started,
    in_progress,
    late,
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
  status: {type: String, enum: ['not started','in progress','late', 'done', ], default: 'not started'},
  dueDate: Date,
  labels: [{type: Types.ObjectId, ref:'labels'}],
  project: {type: Types.ObjectId, ref:'projects'}
  // assignTo: [{type: Types.ObjectId, ref:'users'}],
  // comments: [{type: Types.ObjectId, ref:'comments'}]
}, {timestamps: true})

export const TaskModel = model<ITask>('Task', TaskSchema)
