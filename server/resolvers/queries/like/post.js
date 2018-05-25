export default async ({ post }, args, { db, loader }) => {
  try {
    const postModel = db.model('post')

    return loaders.postById.load({
      data: post,
      model: postModel,
      field: '_id'
    })
  } catch (error) {
    throw new Error(error)
  }
}
