import mongoose from 'mongoose'
import { environment } from '../api-config'

const env = process.env.ENV || 'dev'

const url = `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/simpleplan?retryWrites=true&w=majority`

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
