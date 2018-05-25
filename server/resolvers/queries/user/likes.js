export default async ({ _id }, args, { db, loaders }) => {
  try {
    const likeModel = db.model('like')

    return loaders.likesByLikedBy.load({
      data: _id,
      model: likeModel,
      field: 'likedBy'
    })
  } catch (error) {
    throw new Error(error)
  }
}
