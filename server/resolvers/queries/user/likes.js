export default async (parent, args, ctx) => {
  try {
    const likeModel = ctx.db.model('like')
    return await likeModel.find({ likedBy: parent._id }).exec()
  } catch (error) {
    throw new Error(error)
  }
}
