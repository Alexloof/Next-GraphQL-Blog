export default /* GraphQL */ `
type User {
  _id: ID!
  createdAt: String!
  name: String!
  email: String!
  posts: [Post!]
  comments: [Comment!]
  likes: [Like!]
}

extend type Query {
  allUsers: [User!]
  currentUser: User!
}
`
