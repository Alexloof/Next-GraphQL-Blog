import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const Comment = mongoose.model('comment', commentSchema)

export default Comment
