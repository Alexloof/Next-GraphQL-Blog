import gql from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $email: String
    $password: String
    $newPassword: String
  ) {
    updateUser(
      name: $name
      email: $email
      password: $password
      newPassword: $newPassword
    ) {
      _id
      name
      email
      googleId
    }
  }
`
