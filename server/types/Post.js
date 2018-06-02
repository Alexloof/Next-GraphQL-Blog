export default /* GraphQL */ ` 

type Post {
  _id: ID!
  createdAt: String!
  updatedAt: String!
  name: String!
  content: String!
  image: String
  postedBy: User!
  comments(offset: Int, limit: Int): [Comment!]
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

  postById(_id: String): Post!
}

extend type Mutation {
  writePost(name: String!, content: String!, image: String): Post!
  deletePost(_id: String): Post!
}

extend type Subscription {
  newPost: Post!
}
`
