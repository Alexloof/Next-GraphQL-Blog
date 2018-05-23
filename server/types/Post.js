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
  posts: [Post!]
  count: Int!
}

extend type Query {
  allPosts(
    filter: String
    offset: Int
    limit: Int
    sort: String
  ): PostFeed!

  # allPosts: [Post!]
  postById(_id: String): Post!
}

extend type Mutation {
  writePost(name: String!, content: String!): Post!
}
`
