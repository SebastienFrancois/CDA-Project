import { Schema, model, Document, Types } from 'mongoose';

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
    team: {
      projectManager?: Types.ObjectId,
      developpers?: [Types.ObjectId],
    }
}

const ProjectSchema = new Schema<IProject>({
  name: {type: String, unique: true, maxlength: 255},
  description: {type: String, maxlength: 255},
  status: {type: String, enum: ['not started','in progress','late', 'done', ], default: 'not started'},
  dueDate: Date,
  tasks: [{type: Schema.Types.ObjectId, ref:'Task'}],
  team: {
    projectManager: {type: Schema.Types.ObjectId, ref:'User'},
    developpers: [{type: Schema.Types.ObjectId, ref:'User'}]
  }
}, {timestamps: true})

export const ProjectModel = model<IProject>('Project', ProjectSchema)
