import gql from 'graphql-tag'

export const NEW_POST_SUB = gql`
  subscription newPost {
    newPost {
      _id
      createdAt
      name
      content
      image
      postedBy {
        _id
        name
      }
    }
  }
`
