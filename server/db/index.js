require('dotenv').config()

import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = global.Promise

export default () => {
  mongoose
    .connect(MONGO_URL)
    .then(connection => {
      console.log('Connected to MongoDB')
    })
    .catch(error => {
      console.log(error.message)
    })
}
