import { boolean } from 'joi';
import { Schema, model, Document } from 'mongoose';

export enum Role {
    ADMIN,
    CO,
    DEV,
}

export interface IUser extends Document {
    mail: String,
    username: String,
    password: String,
    role?: Role,
    workspace_settings: {
        notification: {
            all: boolean,
            status: boolean,
            status_alert: {
                in_progress: boolean,
                review: boolean,
                done: boolean
            },
            assigned: boolean,
            comments: boolean
        }
    },
    picture?: String,
    preferred_language: String,
}

const UserSchema = new Schema<IUser>({
  mail: {type: String, unique: true, maxlength: 255},
  username: {type: String, maxlength: 255},
  password: {type: String, maxlength: 255},
  role: {type: String, enum: ['ADMIN','CO','DEV']},
  workspace_settings: {
      notification: {
          all: Boolean,
          status: Boolean,
          status_alert: {
              in_progress: Boolean,
              review: Boolean,
              done: Boolean,
          },
          assigned: Boolean,
          comments: Boolean,
      }
  },
  picture: {type: String, maxlength: 255},
  preferred_language: {type: String, maxlength: 255, default: "fr"}
})

export const UserModel = model<IUser>('User', UserSchema)
