import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import ALL_POSTS from '../api/queries/post/allPosts'
import { LIKE_POST, likePostOptions } from '../api/mutations/like/likePost'

import withUser from '../lib/withUser'
import CommentList from './CommentList'

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
      createdAt,
      user
    } = this.props

    return (
      <Mutation mutation={LIKE_POST} variables={{ postId: _id }}>
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
              <a onClick={() => likePost(likePostOptions(this.props))}>
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
    height: ${props => (props.props.showComments ? 'auto' : '325px')};
    box-shadow: 0px 3px 25px 2px #00000014;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

const BottomSection = styled(Card.Content)`
  display: flex;
  justify-content: space-between;
`

export default withUser(PostCard)
