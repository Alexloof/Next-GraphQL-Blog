export default async (parent, args, { loaders, db }) => {
  try {
    const userModel = db.model('user')
    return await userModel.findOne({ _id: parent.user })
  } catch (error) {
    throw new Error(error)
  }
}
