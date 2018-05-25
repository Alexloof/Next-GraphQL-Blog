export default async ({ postedBy }, args, { loaders, db }) => {
  try {
    const userModel = db.model('user')
    return loaders.postedByById.load({
      data: postedBy,
      model: userModel,
      field: '_id'
    })
  } catch (error) {
    throw new Error(error)
  }
}
