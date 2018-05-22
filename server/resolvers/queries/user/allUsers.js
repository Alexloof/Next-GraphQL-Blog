import User from '../../../db/models/User'

export default async (root, args) => {
  return User.find({}).lean()
}
