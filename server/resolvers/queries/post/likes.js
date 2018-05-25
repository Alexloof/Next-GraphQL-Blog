export default async ({ _id }, args, { db, loaders }) => {
  try {
    const likeModel = db.model('like')
    // return await likeModel.find({ post: parent._id }).exec()
    return loaders.likeByPost.load({ post: _id, model: likeModel })
  } catch (error) {
    throw new Error(error)
  }
}
