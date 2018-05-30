import gql from 'graphql-tag'

export default gql`
  query allPosts {
    allPosts {
      count
      posts {
        _id
        createdAt
        name
        content
        postedBy {
          name
        }
        likes {
          _id
        }
        comments {
          _id
        }
      }
    }
  }
`
