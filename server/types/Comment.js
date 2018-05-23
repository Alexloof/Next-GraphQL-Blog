export default /* GraphQL */ `
type Comment {
  _id: ID!
  createdAt: String!
  text: String!
  commentedBy: User!
  post: Post!
}

extend type Mutation {
  commentPost(postId: ID!, text: String): Comment
}
`
