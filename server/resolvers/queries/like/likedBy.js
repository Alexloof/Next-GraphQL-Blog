export default async ({ likedBy }, args, { db, loaders }) => {
  try {
    const userModel = db.model('user')

    return loaders.user_ById.load({
      data: likedBy,
      model: userModel,
      field: '_id'
    })
  } catch (error) {
    throw new Error(error)
  }
}
