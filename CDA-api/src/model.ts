import { Schema, model, Document } from 'mongoose'

export type Skill = { title: string; votes: number }

export interface Wilder extends Document {
  name: String
  city: String
  description: String
  skills?: Skill[]
  completed?: String
}

const WilderSchema = new Schema<Wilder>({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
  completed: {
    type: String,
    enum: ['in progress', 'complete', 'not started'],
    default: 'in progress',
  },
  description: String,
})

export const WilderModel = model<Wilder>('Wilder', WilderSchema)
