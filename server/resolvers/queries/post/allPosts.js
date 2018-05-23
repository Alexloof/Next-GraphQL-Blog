export default async (parent, { filter, offset, limit, sort }, ctx) => {
  try {
    const postModel = ctx.db.model('post')
    const posts = await postModel
      .find(
        filter
          ? {
              $or: [
                { name: new RegExp(filter, 'i') },
                { content: new RegExp(filter, 'i') }
              ]
            }
          : {}
      )
      .skip(offset || null)
      .limit(limit || null)
      .sort(sort || null)
      .exec()

    const count = await postModel.count().exec()

    return {
      posts,
      count
    }
  } catch (error) {
    throw new Error(error)
  }
}
