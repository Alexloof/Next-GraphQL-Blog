export default async (parent, args, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const user = ctx.db.model('user')
    return await user.find({}).exec()
  } catch (error) {
    throw new Error(error)
  }
}
