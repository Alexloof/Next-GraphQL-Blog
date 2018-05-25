export default async ({ _id }, args, { db, loaders }) => {
  try {
    const commentModel = db.model('comment')

    return loaders.comments_ByCommentedBy.load({
      data: _id,
      model: commentModel,
      field: 'commentedBy'
    })
  } catch (error) {
    throw new Error(error)
  }
}
