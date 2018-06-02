import gql from 'graphql-tag'

export default gql`
  query allPosts($filter: String, $offset: Int, $limit: Int, $sort: String) {
    allPosts(filter: $filter, offset: $offset, limit: $limit, sort: $sort) {
      count
      posts {
        _id
        createdAt
        name
        content
        image
        postedBy {
          _id
          name
        }
        likes {
          _id
        }
        comments {
          _id
          createdAt
          text
          commentedBy {
            _id
            name
          }
        }
      }
    }
  }
`
