import mongoose from 'mongoose'
require('dotenv').config()

const url = `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/simpleplan?retryWrites=true&w=majority`

export default async function connect() {
  try {
    await mongoose.connect(url, {
      autoIndex: true,
    })
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}
