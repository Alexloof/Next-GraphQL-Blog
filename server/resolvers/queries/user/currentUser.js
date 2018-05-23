import { getUserId } from '../../../utils'

export default async (root, args, ctx) => {
  try {
    const userId = getUserId(ctx)
    const user = ctx.db.model('user')
    return await user.findOne({ _id: userId }).lean()
  } catch (error) {
    throw new Error(error)
  }
}
