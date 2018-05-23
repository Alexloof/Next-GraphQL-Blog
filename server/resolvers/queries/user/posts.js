export default async (parent, args, ctx) => {
  try {
    const postModel = ctx.db.model('post')
    return await postModel.find({ postedBy: parent._id }).exec()
  } catch (error) {
    throw new Error(error)
  }
}
