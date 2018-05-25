export default async ({ _id }, args, { db, loaders }) => {
  try {
    const commentModel = db.model('comment')

    return loaders.commentsByPost.load({
      data: _id,
      model: commentModel,
      field: 'post'
    })
  } catch (error) {
    throw new Error(error)
  }
}
