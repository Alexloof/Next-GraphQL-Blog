import User from '../../../db/models/User'
import { getUserId } from '../../../utils'

export default async (root, args, ctx) => {
  const userId = getUserId(ctx)
  return await User.findOne({ _id: userId }).lean()
}
