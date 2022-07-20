import Joi from 'joi';
import { Schema, model, Document } from 'mongoose';

export enum Role {
    ADMIN,
    CO,
    DEV,
}

export interface IUser extends Document {
    email: string,
    username: string,
    password: string,
    role?: Role,
    workspace_settings?: {
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
  email: {type: String, unique: true, maxlength: 255},
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

export const validateUser = (user: IUser) => {
    const schema = Joi.object().keys({
      email: Joi.string().trim().max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required().messages({
        'string.empty': `"email" ne peut etre vide`,
        'string.max': `"email" ne peut etre plus grand que {#limit} caractères`,
        'any.required': `"email" est requis`
      }),
      username: Joi.string().trim().max(255).required().messages({
        'string.empty': `"username" ne peut etre vide`,
        'string.max': `"username" ne peut etre plus grand que {#limit} caractères`,
        'any.required': `"username" est requis`
      }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'any.required': `"password" ne peut etre vide`
      }),
      picture: Joi.string(),
      preferred_language: Joi.string(),
    });
    return schema.validate(user, {abortEarly:false});
  };
