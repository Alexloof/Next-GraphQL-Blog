import React, { Component } from 'react'
import { Query } from 'react-apollo'

import FeedList from '../components/FeedList'

import ALL_POSTS from '../api/queries/post/allPosts'
import { NEW_LIKE_SUB, newLikeUpdate } from '../api/subscriptions/newLike'
import {
  NEW_COMMENT_SUB,
  newCommentUpdate
} from '../api/subscriptions/newComment'

class Home extends Component {
  subscribeToNewLikes = subscribeToMore =>
    subscribeToMore({
      document: NEW_LIKE_SUB,
      updateQuery: (prev, result) => newLikeUpdate(prev, result)
    })

  subscribeToNewComments = subscribeToMore =>
    subscribeToMore({
      document: NEW_COMMENT_SUB,
      updateQuery: (prev, result) => newCommentUpdate(prev, result)
    })

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
              subscribeToNewComments={() =>
                this.subscribeToNewComments(subscribeToMore)
              }
            />
          )
        }}
      </Query>
    )
  }
}

export default Home
