export default async ({ postedBy }, args, { loaders, db }) => {
  try {
    const user = db.model('user')
    return loaders.userById.load({ id: postedBy, model: user })
  } catch (error) {
    throw new Error(error)
  }
}
