export default /* GraphQL */ `
type Like {
  _id: ID!
  likedBy: User!
  post: Post!
}

extend type Mutation {
  likePost(postId: ID!): Like
}
`
