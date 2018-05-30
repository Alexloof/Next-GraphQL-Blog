import gql from 'graphql-tag'

export default gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      post {
        _id
      }
      likedBy {
        _id
        name
      }
    }
  }
`
