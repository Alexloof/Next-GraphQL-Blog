export default async (parent, args, ctx) => {
  try {
    const user = ctx.db.model('user')
    return await user.find({}).exec()
  } catch (error) {
    throw new Error(error)
  }
}
