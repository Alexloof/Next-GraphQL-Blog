export default async (parent, { _id }, ctx) => {
  try {
    const postModel = ctx.db.model('post')
    return await postModel.findOne({ _id }).lean()
  } catch (error) {
    throw new Error(error)
  }
}
