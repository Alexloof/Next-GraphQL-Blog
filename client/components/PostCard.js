import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const PostCard = ({
  _id,
  name,
  content,
  postedBy,
  likes,
  comments,
  createdAt
}) => (
  <Mutation mutation={LIKE_POST} variables={{ postId: _id }}>
    {(likePost, { loading, error, data }) => (
      <Card>
        <Image src="/static/blog-placeholder.jpg" />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>By {postedBy.name}</Card.Meta>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
        <BottomSection extra>
          <a>
            <Icon name="comment" />
            {comments.length} Comments
          </a>
          <a onClick={() => likePost()}>
            <Icon name="like" />
            {likes.length} Likes
          </a>
        </BottomSection>
      </Card>
    )}
  </Mutation>
)

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
    }
  }
`

const BottomSection = styled(Card.Content)`
  &&& {
    display: flex;
    justify-content: space-between;
  }
`

export default PostCard
