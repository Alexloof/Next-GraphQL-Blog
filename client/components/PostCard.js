import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import ALL_POSTS from '../api/queries/post/allPosts'
import LIKE_POST from '../api/mutations/like/likePost'

import CommentList from './CommentList'

const fakeId = Math.round(Math.random() * -1000000)

class PostCard extends Component {
  state = {
    showComments: false
  }

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments
    })
  }

  render() {
    const { showComments } = this.state
    const {
      _id,
      name,
      content,
      postedBy,
      likes,
      comments,
      createdAt
    } = this.props

    return (
      <Mutation
        mutation={LIKE_POST}
        variables={{ postId: _id }}
        optimisticResponse={{
          __typename: 'Mutation',
          likePost: {
            __typename: 'Like',
            _id: fakeId
          }
        }}
        update={(cache, { data: { likePost } }) => {
          const { allPosts } = cache.readQuery({
            query: ALL_POSTS,
            variables: { sort: '-createdAt' }
          })

          // takes a reference of the post we want
          const updatedPost = allPosts.posts.find(post => post._id === _id)

          // mutates the reference
          updatedPost.likes = [...updatedPost.likes, likePost]

          cache.writeQuery({
            query: ALL_POSTS,
            data: {
              allPosts: {
                __typename: 'PostFeed',
                count: allPosts.count++,
                posts: [...allPosts.posts]
              }
            }
          })
        }}
      >
        {(likePost, { loading, error, data }) => (
          <StyledCard props={{ showComments }}>
            <Image src="/static/blog-placeholder.jpg" />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>By {postedBy.name}</Card.Meta>
              <Card.Description>{content}</Card.Description>
            </Card.Content>
            <BottomSection extra>
              <a onClick={this.toggleComments}>
                <Icon name="comment" />
                {comments.length} Comments
              </a>
              <a onClick={() => likePost()}>
                <Icon name="like" />
                {likes.length} Likes
              </a>
            </BottomSection>
            {showComments && <CommentList comments={comments} postId={_id} />}
          </StyledCard>
        )}
      </Mutation>
    )
  }
}

const StyledCard = styled(Card)`
  &&& {
    height: ${props => (props.props.showComments ? 'auto' : '340px')};
  }
`

const BottomSection = styled(Card.Content)`
  display: flex;
  justify-content: space-between;
`

export default PostCard
