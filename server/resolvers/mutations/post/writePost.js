import { getUserId } from '../../../utils'

export default async (parent, { name, content, image }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const postModel = ctx.db.model('post')

    const post = await postModel.create({
      name,
      content,
      image,
      postedBy: ctx.user
    })

    ctx.pubsub.publish('newLink', { newPost: post })

    return post
  } catch (error) {
    throw new Error(error)
  }
}
