export default async ({ _id }, args, { db, loaders }) => {
  try {
    const commentModel = db.model('comment')

    return loaders.comments_ByPost.load({
      data: _id,
      model: commentModel,
      field: 'post',
      options: {
        limit: 3
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}
