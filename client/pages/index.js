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
        // console.log(prev.allPosts.posts)
        // console.log(newLike.post._id)
        const pickPost = prev.allPosts.posts.find(
          post => post._id === newLike.post._id
        )
        const updatedPost = { ...pickPost }
        updatedPost.likes = [...updatedPost.likes, updatedPost]

        const test = {
          ...prev,
          allPosts: {
            count: prev.allPosts.count,
            posts: {
              ...prev.allPosts.posts,
              updatedPost
            }
          }
        }
        console.log(prev)
        console.log(test)
        return test
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
