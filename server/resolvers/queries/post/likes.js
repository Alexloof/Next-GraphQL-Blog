export default async ({ _id }, args, { db, loaders }) => {
  try {
    const likeModel = db.model('like')

    return loaders.likeByPost.load({
      data: _id,
      model: likeModel,
      field: 'post'
    })
  } catch (error) {
    throw new Error(error)
  }
}
