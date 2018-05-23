require('dotenv').config()

import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = global.Promise

export default async () => {
  return await mongoose.connect(MONGO_URL)
}
