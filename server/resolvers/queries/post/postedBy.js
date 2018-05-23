export default async (parent, args, ctx) => {
  try {
    const user = ctx.db.model('user')
    return await user.findOne({ _id: parent.postedBy }).exec()
  } catch (error) {
    throw new Error(error)
  }
}
