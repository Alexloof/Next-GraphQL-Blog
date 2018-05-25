export default {
  newComment: {
    subscribe: async (parent, args, ctx) => {
      return ctx.pubsub.asyncIterator('newComment')
    }
  }
}
