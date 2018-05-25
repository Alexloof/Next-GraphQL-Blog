export default async (parent, args, ctx) => {
  try {
    const postModel = ctx.db.model('post')
    return await postModel.findOne({ _id: parent.post })
  } catch (error) {
    throw new Error(error)
  }
}
