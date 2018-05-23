import { getUserId } from '../../../utils'

export default async (parent, { name, content }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const postModel = ctx.db.model('post')

    const post = await postModel.create({
      name,
      content,
      postedBy: ctx.user
    })

    return post
  } catch (error) {
    throw new Error(error)
  }
}
