export default async (parent, { postId }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const likeModel = ctx.db.model('like')

    const likeExist = await likeModel
      .findOne({ likedBy: ctx.user, post: postId })
      .exec()

    if (likeExist) throw new Error('You have already liked this post')

    const like = await likeModel.create({
      likedBy: ctx.user,
      post: postId
    })

    return like
  } catch (error) {
    throw new Error(error)
  }
}
