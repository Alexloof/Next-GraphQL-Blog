export default async ({ _id }, args, { db, loaders }) => {
  try {
    const postModel = db.model('post')

    return loaders.postsByPostedBy.load({
      data: _id,
      model: postModel,
      field: 'postedBy'
    })
  } catch (error) {
    throw new Error(error)
  }
}
