import User from '../../../db/models/User'

export default async (root, args, ctx) => {
  console.log('context', ctx)
  return User.findOne({}).lean()
}
