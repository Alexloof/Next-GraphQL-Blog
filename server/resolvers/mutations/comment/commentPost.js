export default async (parent, { postId, text }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const commentModel = ctx.db.model('comment')

    const comment = await commentModel.create({
      text,
      commentedBy: ctx.user,
      post: postId
    })

    return comment
  } catch (error) {
    throw new Error(error)
  }
}
