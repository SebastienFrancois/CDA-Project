import { Schema, model, Document } from 'mongoose';


export interface ILabel extends Document {
    name: String,
    color: String,
}

const LabelSchema = new Schema<ILabel>({
  name: {type: String, unique: true, maxlength: 255},
  color: {type: String, maxlength: 255}
})

export const LabelModel = model<ILabel>('Label', LabelSchema)
