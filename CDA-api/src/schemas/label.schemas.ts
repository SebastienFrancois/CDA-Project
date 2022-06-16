import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

export interface ILabel extends Document {
    name: String,
    color: String,
}

const LabelSchema = new Schema<ILabel>({
  name: {type: String, unique: true, maxlength: 255},
  color: {type: String, maxlength: 255}
})

export const LabelModel = model<ILabel>('Label', LabelSchema)


export const validateLabel = (label: ILabel) => {
  var schema = Joi.object().keys({
    name: Joi.string().trim().max(255).required().messages({
      'string.empty': `"name" ne peut etre vide`,
      'string.max': `"name" ne peut etre plus grand que {#limit} caractères`,
      'any.required': `"name" est requis`
    }),
    color: Joi.string().trim().required().messages({
      'string.empty': `"color" ne peut etre vide`,
      'any.required': `"color" est requis`
    }),
  });
  return schema.validate(label, {abortEarly:false});
};