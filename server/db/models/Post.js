import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    maxlength: 2000,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const Post = mongoose.model('post', postSchema)

export default Post
