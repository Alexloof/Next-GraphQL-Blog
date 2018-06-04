import { getUserId } from '../../../utils'

export default async (parent, { _id }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const postModel = ctx.db.model('post')

    const post = await postModel.findOne({ _id: _id }).exec()

    if (post.postedBy == ctx.user) {
      await postModel.deleteOne({ _id: _id }).exec()

      return post
    }
    throw new Error('You can only delete your posts')
  } catch (error) {
    throw new Error(error)
  }
}
