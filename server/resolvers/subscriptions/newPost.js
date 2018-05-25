export default {
  newPost: {
    subscribe: async (parent, args, ctx) => {
      return ctx.pubsub.asyncIterator('newLink')
    }
  }
}
