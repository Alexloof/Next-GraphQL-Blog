import React, { Component } from 'react'
import { Card, Icon, Image, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import ALL_POSTS from '../api/queries/post/allPosts'
import { LIKE_POST, likePostOptions } from '../api/mutations/like/likePost'
import {
  DELETE_POST,
  deletePostOptions
} from '../api/mutations/post/deletePost'

import withUser from '../lib/withUser'
import parseError from '../lib/parseError'
import { showSuccessAlert, showErrorAlert } from '../lib/alerts'

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
      image,
      user
    } = this.props

    return (
      <Mutation mutation={LIKE_POST} variables={{ postId: _id }}>
        {likePost => (
          <Mutation mutation={DELETE_POST} variables={{ _id: _id }}>
            {deletePost => (
              <StyledCard props={{ showComments }}>
                {user &&
                  user._id === postedBy._id && (
                    <RemoveIcon
                      name="remove"
                      onClick={() => {
                        deletePost(deletePostOptions(this.props)).then(() =>
                          showSuccessAlert('Post was deleted!')
                        )
                      }}
                    />
                  )}

                <StyledImage
                  src={image ? image : '/static/blog-placeholder.jpg'}
                />

                <Card.Content>
                  <Card.Header style={ellipsisStyle}>{name}</Card.Header>
                  <Card.Meta style={ellipsisStyle}>
                    By {postedBy.name}
                  </Card.Meta>
                  <Card.Description style={ellipsisStyle}>
                    {content}
                  </Card.Description>
                </Card.Content>

                <BottomSection extra>
                  <a onClick={this.toggleComments}>
                    <Icon name="comment" />
                    {comments.length} Comments
                  </a>
                  <a
                    onClick={() => {
                      likePost(likePostOptions(this.props))
                        .then(() => showSuccessAlert('You liked a Post!'))
                        .catch(e => showErrorAlert(parseError(e.message)))
                    }}
                  >
                    <Icon name="like" />
                    {likes.length} Likes
                  </a>
                </BottomSection>

                {showComments && (
                  <CommentList comments={comments} postId={_id} />
                )}
              </StyledCard>
            )}
          </Mutation>
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

const RemoveIcon = styled(Icon)`
  &&& {
    font-size: 18px;
    position: absolute;
    top: 5px;
    z-index: 9;
    right: 0;
    cursor: pointer;
    transition: 0.2s all ease;
    &:hover {
      font-size: 22px;
    }
  }
`

const StyledImage = styled(Image)`
  &&& {
    height: 191px;
    object-fit: cover;
  }
`

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}

export default withUser(PostCard)
