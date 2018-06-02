import gql from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation updateUser($name: String!, $content: String!, $image: String) {
    updateUser(name: $name, content: $content, image: $image) {
      _id
      name
      email
    }
  }
`
