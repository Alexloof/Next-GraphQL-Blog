export default async (parent, args, ctx) => {
  try {
    const commentModel = ctx.db.model('comment')
    return await commentModel.find({ post: parent._id }).exec()
  } catch (error) {
    throw new Error(error)
  }
}
