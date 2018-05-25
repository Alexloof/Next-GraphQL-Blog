export default async (parent, args, ctx) => {
  try {
    const user = ctx.db.model('user')
    return ctx.loaders.user.load({ id: parent.postedBy, model: user })
  } catch (error) {
    throw new Error(error)
  }
}
