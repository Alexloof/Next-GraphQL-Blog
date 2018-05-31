import gql from 'graphql-tag'

export const WRITE_POST = gql`
  mutation writePost($name: String!, $content: String!) {
    writePost(name: $name, content: $content) {
      _id
      name
      createdAt
      content
      postedBy {
        _id
        name
      }
    }
  }
`
