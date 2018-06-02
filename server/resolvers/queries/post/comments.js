export default async ({ _id }, { offset, limit }, { db, loaders }) => {
  try {
    const commentModel = db.model('comment')

    return loaders.comments_ByPost.load({
      data: _id,
      model: commentModel,
      field: 'post',
      options: {
        offset,
        limit
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}
