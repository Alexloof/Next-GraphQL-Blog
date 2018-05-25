export default async ({ _id }, args, { db, loaders }) => {
  try {
    const commentModel = db.model('comment')
    //return await commentModel.find({ post: parent._id }).exec()

    return loaders.commentByPost.load({
      data: _id,
      model: commentModel,
      field: 'post'
    })
  } catch (error) {
    throw new Error(error)
  }
}
