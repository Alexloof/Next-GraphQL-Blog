import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import privatePage from '../lib/privatePage'

class User extends Component {
  render() {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data: { currentUser } }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          return <div>id: {currentUser.name}</div>
        }}
      </Query>
    )
  }
}

const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      name
      email
    }
  }
`

export default privatePage(User)
