import React, { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { Transition, animated } from 'react-spring'
import { Input, Form } from 'semantic-ui-react'

import FeedList from '../components/FeedList'
import LoadPendingButton from '../components/LoadPendingButton'

import ALL_POSTS from '../api/queries/post/allPosts'
import { NEW_LIKE_SUB, newLikeUpdate } from '../api/subscriptions/newLike'
import {
  NEW_COMMENT_SUB,
  newCommentUpdate
} from '../api/subscriptions/newComment'
import { NEW_POST_SUB } from '../api/subscriptions/newPost'

import { POSTS_LIMIT } from '../api/constants'

class Home extends Component {
  state = {
    newPosts: [],
    searchTerm: ''
  }

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

  subscribeToNewPosts = subscribeToMore =>
    subscribeToMore({
      document: NEW_POST_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newPost = { ...subscriptionData.data.newPost }
        newPost.likes = []
        newPost.comments = []

        this.setState(prevState => {
          return {
            newPosts: [newPost, ...prevState.newPosts]
          }
        })
      }
    })

  fetchMorePosts = (fetchMore, offset) =>
    fetchMore({
      variables: { offset },
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

  loadPendingPosts = () => {
    // Read and write to cache to minimize network requests.
    // Though some likes & comments can be missed.
    // Use a refetch instead of read/write to cache to solve that.

    const { allPosts } = this.props.client.readQuery({
      query: ALL_POSTS,
      variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' }
    })

    const newPostslength = this.state.newPosts.length
    allPosts.posts.unshift(...this.state.newPosts)

    this.props.client.writeQuery({
      query: ALL_POSTS,
      variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' },
      data: {
        allPosts: {
          __typename: 'PostFeed',
          count: allPosts.count + newPostslength,
          posts: [...allPosts.posts]
        }
      }
    })
    window.scroll(0, 0)
    this.setState({
      newPosts: []
    })
  }

  searchPosts = async e => {
    e.preventDefault()
    const { data } = await this.props.client.query({
      query: ALL_POSTS,
      variables: {
        filter: this.state.searchTerm,
        sort: '-createdAt',
        limit: POSTS_LIMIT,
        offset: 0
      }
    })

    const cacheData = this.props.client.readQuery({
      query: ALL_POSTS,
      variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' }
    })

    this.props.client.writeQuery({
      query: ALL_POSTS,
      variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' },
      data: {
        allPosts: {
          __typename: 'PostFeed',
          count: cacheData.allPosts.count,
          posts: [...data.allPosts.posts]
        }
      }
    })
  }

  render() {
    return (
      <Query
        query={ALL_POSTS}
        variables={{ sort: '-createdAt', limit: POSTS_LIMIT, offset: 0 }}
        notifyOnNetworkStatusChange
      >
        {({ loading, subscribeToMore, fetchMore, data: { allPosts } }) => {
          const postLength = allPosts.posts.length
          const pendingPostLength = this.state.newPosts.length
          return (
            <>
              <Transition
                from={{ top: '-50px' }}
                enter={{ top: '50px' }}
                leave={{ top: '-50px' }}
              >
                {!!pendingPostLength &&
                  (style => (
                    <LoadPendingButton
                      style={{ ...style }}
                      onClick={this.loadPendingPosts}
                    >
                      Load {pendingPostLength} new post...
                    </LoadPendingButton>
                  ))}
              </Transition>

              <Form onSubmit={this.searchPosts}>
                <StyledInput
                  onChange={e => this.setState({ searchTerm: e.target.value })}
                  value={this.state.searchTerm}
                  size="large"
                  icon="search"
                  placeholder="Search..."
                />
              </Form>

              <FeedList
                posts={allPosts.posts}
                subscribeToNewLikes={() =>
                  this.subscribeToNewLikes(subscribeToMore)
                }
                subscribeToNewComments={() =>
                  this.subscribeToNewComments(subscribeToMore)
                }
                subscribeToNewPosts={() =>
                  this.subscribeToNewPosts(subscribeToMore)
                }
                hasMorePosts={allPosts.count !== postLength}
                fetchMore={() => this.fetchMorePosts(fetchMore, postLength)}
              />

              {/*fix nice loading spinner here */}
              {loading && <p>Loading...</p>}
            </>
          )
        }}
      </Query>
    )
  }
}

export default Home

const StyledInput = styled(Input)`
  &&& {
    display: flex;
    justify-content: center;
    width: 400px;
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
  }
`
