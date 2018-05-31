import React, { Component } from 'react'
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import { Mutation } from 'react-apollo'

import withUser from '../lib/withUser'

import ALL_POSTS from '../api/queries/post/allPosts'
import {
  COMMENT_POST,
  commentPostOptions
} from '../api/mutations/comment/commentPost'

class CommentList extends Component {
  state = {
    input: ''
  }

  writeComment = (e, commentPost) => {
    e.preventDefault()
    const { input } = this.state
    if (!input) return

    commentPost(commentPostOptions(this.props, input))

    this.setState({
      input: ''
    })
  }

  handleChange = e => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    const { comments, postId, user } = this.props
    return (
      <Mutation
        mutation={COMMENT_POST}
        variables={{ postId: postId, text: this.state.input }}
      >
        {(commentPost, { loading, error, data }) => (
          <CommentContainer>
            {comments.map(comment => {
              return (
                <Comment key={comment._id}>
                  <Comment.Content>
                    <Comment.Author as="a">
                      {comment.commentedBy.name}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{moment(new Date(comment.createdAt)).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text style={{ height: '20px' }}>
                      {comment.text}
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              )
            })}
            <form onSubmit={e => this.writeComment(e, commentPost)}>
              <Input
                action="Comment"
                value={this.state.input}
                onChange={this.handleChange}
                placeholder="Write a comment..."
              />
            </form>
          </CommentContainer>
        )}
      </Mutation>
    )
  }
}

export default withUser(CommentList)

const CommentContainer = styled(Comment.Group)`
  &&& {
    padding: 15px;
    margin: 0;
  }
`
