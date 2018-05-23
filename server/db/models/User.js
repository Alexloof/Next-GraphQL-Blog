import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // Don't return password unless specified to
  password: { type: String, select: false }
})

const User = mongoose.model('user', userSchema)

export default User
