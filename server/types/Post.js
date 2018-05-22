export default /* GraphQL */ ` 
type Post {
  _id: ID!
  createdAt: String!
  updatedAt: String!
  name: String!
  content: String!
  postedBy: User!
  comments: [Comment!]
  likes: [Like!]
}

type PostFeed {
  posts: [Post!]!
  count: Int!
}

# extend type Query {
#   posts(
#     filter: String
#     skip: Int
#     first: Int
#     orderBy: PostOrderByInput
#   ): PostFeed!
# }

extend type Mutation {
  writePost(name: String!, content: String!): Post!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  updatedAt_ASC
  updatedAt_DESC
}
`
