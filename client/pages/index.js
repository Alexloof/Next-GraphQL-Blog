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
      <Query
        query={ALL_POSTS}
        variables={{ sort: '-createdAt', limit: 5, offset: 0 }}
        notifyOnNetworkStatusChange
      >
        {({
          loading,
          error,
          data: { allPosts },
          subscribeToMore,
          fetchMore
        }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          return (
            <>
              <FeedList
                posts={allPosts.posts}
                subscribeToNewLikes={() =>
                  this.subscribeToNewLikes(subscribeToMore)
                }
                subscribeToNewComments={() =>
                  this.subscribeToNewComments(subscribeToMore)
                }
              />
              {allPosts.count !== allPosts.posts.length && (
                <a
                  onClick={() =>
                    fetchMore({
                      variables: { offset: allPosts.posts.length },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev
                        const newPosts = [
                          ...prev.allPosts.posts,
                          ...fetchMoreResult.allPosts.posts
                        ]

                        // remove duplicate posts that can occur during a newly
                        // created post from another user
                        const updatedPosts = newPosts.filter(
                          (post, index, self) =>
                            index === self.findIndex(t => t._id === post._id)
                        )

                        return {
                          ...prev,
                          allPosts: {
                            __typename: 'PostFeed',
                            count: prev.allPosts.count,
                            posts: updatedPosts
                          }
                        }
                      }
                    })
                  }
                >
                  fetchMore
                </a>
              )}
            </>
          )
        }}
      </Query>
    )
  }
}

export default Home
