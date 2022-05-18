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
    assignTo: [Types.ObjectId],
    project: Types.ObjectId,
    comments: [Types.ObjectId]
}

const TaskSchema = new Schema<ITask>({
  name: {type: String, unique: true, maxlength: 255},
  description: {type: String, maxlength: 255},
  status: {type: String, enum: ['not started','in progress','late', 'done', ], default: 'not started'},
  dueDate: Date,
  labels: [{type: Schema.Types.ObjectId, ref:'Label'}],
  assignTo: [{type: Schema.Types.ObjectId, ref:'User'}],
  project: {type: Schema.Types.ObjectId, ref:'Project'},
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
}, {timestamps: true})

export const TaskModel = model<ITask>('Task', TaskSchema)
