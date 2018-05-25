// require dotenv here also to solve BUG ?
require('dotenv').config()

import mongoose from 'mongoose'

// Import all models
import './models/User'
import './models/Post'
import './models/Comment'
import './models/Like'

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = global.Promise

mongoose.set('debug', true)

export default async () => {
  console.log('connectar MongoDB')
  return await mongoose.connect(MONGO_URL)
}
