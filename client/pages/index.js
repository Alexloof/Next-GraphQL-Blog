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
        const newLike = subscriptionData.data.newLike

        const posts = [...prev.allPosts.posts]

        let likeExist = false
        posts.map(post => {
          if (post._id === newLike.post._id) {
            post.likes.map(like => {
              if (like._id === newLike._id) {
                likeExist = true
              }
            })
          }
        })

        if (!likeExist) {
          const newPosts = posts.map(
            post =>
              post._id === newLike.post._id
                ? { ...post, likes: [...post.likes, newLike] }
                : post
          )

          return {
            ...prev,
            allPosts: {
              __typename: 'PostFeed',
              count: prev.allPosts.count,
              posts: newPosts
            }
          }
        }
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
      post {
        _id
      }
    }
  }
`

export default Home
