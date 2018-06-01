export default async (parent, { filter, offset, limit, sort }, { db }) => {
  try {
    const postModel = db.model('post')

    const offsetOption = offset || ''
    const limitOption = limit || 20
    const sortOption = sort || ''

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
      .skip(offsetOption)
      .limit(limitOption)
      .sort(sortOption)
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
