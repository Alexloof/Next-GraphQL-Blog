import { getUserId } from '../../../utils'

export default async (parent, { name, content }, ctx) => {
  try {
    const postModel = ctx.db.model('post')

    const userId = getUserId(ctx)

    const post = await postModel.create({
      name,
      content,
      postedBy: userId
    })

    return post
  } catch (error) {
    throw new Error(error)
  }
}
