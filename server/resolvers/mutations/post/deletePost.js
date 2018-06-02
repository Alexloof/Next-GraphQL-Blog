import { getUserId } from '../../../utils'

export default async (parent, { _id }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const postModel = ctx.db.model('post')

    const post = await postModel.findOne({ _id: _id }).exec()

    if (post.postedBy != ctx.user) {
      throw new Error('You can only delete your posts')
    }

    await postModel.deleteOne({ _id: _id }).exec()

    // ctx.pubsub.publish('newLink', { newPost: post })

    return post
  } catch (error) {
    throw new Error(error)
  }
}
