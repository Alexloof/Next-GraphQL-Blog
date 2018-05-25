export default async ({ post }, args, { db, loaders }) => {
  try {
    const postModel = db.model('post')

    return loaders.post_ById.load({
      data: post,
      model: postModel,
      field: '_id'
    })
  } catch (error) {
    throw new Error(error)
  }
}
