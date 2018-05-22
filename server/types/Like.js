export default /* GraphQL */ `
type Like {
  _id: ID!
  user: User!
  post: Post!
}

extend type Mutation {
  likePost(postId: ID!): Like
}
`
