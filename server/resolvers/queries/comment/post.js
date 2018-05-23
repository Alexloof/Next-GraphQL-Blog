export default async (parent, args, ctx) => {
  const postModel = ctx.db.model('post')
  return await postModel.findOne({ _id: parent.post })
  try {
  } catch (error) {
    throw new Error(error)
  }
}
