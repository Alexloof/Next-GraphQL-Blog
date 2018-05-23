export default async (root, args, ctx) => {
  try {
    const user = ctx.db.model('user')
    return await user.find({}).lean()
  } catch (error) {
    throw new Error(error)
  }
}
