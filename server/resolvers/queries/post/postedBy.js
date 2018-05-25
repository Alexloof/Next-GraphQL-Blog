export default async ({ postedBy }, args, { loaders, db }) => {
  try {
    const user = db.model('user')
    return loaders.userById.load({ data: postedBy, model: user, field: '_id' })
  } catch (error) {
    throw new Error(error)
  }
}
