export default {
  newLike: {
    subscribe: async (parent, args, ctx) => {
      return ctx.pubsub.asyncIterator('newLike')
    }
  }
}
