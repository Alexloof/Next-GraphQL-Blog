export default async ({ commentedBy }, args, { db, loaders }) => {
  try {
    const userModel = db.model('user')

    return loaders.user_ById.load({
      data: commentedBy,
      model: userModel,
      field: '_id'
    })
  } catch (error) {
    throw new Error(error)
  }
}
