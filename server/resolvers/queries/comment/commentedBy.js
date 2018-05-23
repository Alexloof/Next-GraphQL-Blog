export default async (parent, args, ctx) => {
  const userModel = ctx.db.model('user')
  return await userModel.findOne({ _id: parent.commentedBy })
  try {
  } catch (error) {
    throw new Error(error)
  }
}
