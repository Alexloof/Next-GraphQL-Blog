import React, { Component } from 'react'
import { graphql, compose, Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import privatePage from '../lib/privatePage'

class User extends Component {
  render() {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data: { currentUser } }) => {
          console.log('KÖÖÖRS')
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          console.log(currentUser)
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
