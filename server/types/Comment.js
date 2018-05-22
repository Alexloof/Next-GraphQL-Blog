export default /* GraphQL */ `
type Comment {
  _id: ID!
  createdAt: String!
  text: String!
  postedBy: User!
  post: Post!
}

extend type Mutation {
  commentPost(postId: ID!): Comment
}
`
