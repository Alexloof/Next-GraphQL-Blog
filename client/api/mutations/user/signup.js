import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`
