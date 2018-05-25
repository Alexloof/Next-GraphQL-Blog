export default async ({ postedBy }, args, { loaders, db }) => {
  try {
    const userModel = db.model('user')
    return loaders.user_ById.load({
      data: postedBy,
      model: userModel,
      field: '_id'
    })
  } catch (error) {
    throw new Error(error)
  }
}
