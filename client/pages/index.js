import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import FeedList from '../components/FeedList'

import ALL_POSTS from '../api/queries/post/allPosts'

class Home extends Component {
  subscribeToNewLikes = subscribeToMore => {
    return subscribeToMore({
      document: NEW_LIKE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        console.log('TACK FÖR LIKE', subscriptionData.data)
      }
    })
  }
  render() {
    return (
      <Query query={ALL_POSTS} variables={{ sort: '-createdAt' }}>
        {({ loading, error, data: { allPosts }, subscribeToMore }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          return (
            <FeedList
              posts={allPosts.posts}
              subscribeToNewLikes={() =>
                this.subscribeToNewLikes(subscribeToMore)
              }
            />
          )
        }}
      </Query>
    )
  }
}

const NEW_LIKE_SUB = gql`
  subscription newLike {
    newLike {
      _id
    }
  }
`

export default Home
