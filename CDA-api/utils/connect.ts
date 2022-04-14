import mongoose from 'mongoose'

const url = ''

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
