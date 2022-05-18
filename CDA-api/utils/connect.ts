import mongoose from 'mongoose'
import { environment } from '../api-config'

const env = process.env.ENV || 'dev'

export default async function connect() {
  try {
    await mongoose.connect(environment[env].dbString, {
      autoIndex: true,
    })
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}
