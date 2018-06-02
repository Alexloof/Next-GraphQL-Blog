import React, { Component } from 'react'
import { Comment, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import { Mutation, Query } from 'react-apollo'
import ReactDOM from 'react-dom'

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

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
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

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messageList)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  render() {
    const { postId, user } = this.props
    return (
      <Mutation
        mutation={COMMENT_POST}
        variables={{ postId: postId, text: this.state.input }}
      >
        {(commentPost, { loading, error, data }) => (
          <Query query={COMMENTS_BY_POST} variabels={{ postId: postId }}>
            {{ loading, fetchMore, data }}
            <CommentContainer>
              <StyledList
                ref={node => {
                  this.messageList = node
                }}
              >
                {comments.map(comment => {
                  return (
                    <Comment key={comment._id}>
                      <Comment.Content>
                        <Comment.Author as="a">
                          {comment.commentedBy.name}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {moment(new Date(comment.createdAt)).fromNow()}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.text}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  )
                })}
                <div
                  style={{ float: 'left', clear: 'both' }}
                  ref={el => {
                    this.messagesEnd = el
                  }}
                />
              </StyledList>

              <form onSubmit={e => this.writeComment(e, commentPost)}>
                <Input
                  action="Comment"
                  value={this.state.input}
                  onChange={this.handleChange}
                  placeholder="Write a comment..."
                />
              </form>
            </CommentContainer>
          </Query>
        )}
      </Mutation>
    )
  }
}

export default withUser(CommentList)

const CommentContainer = styled(Comment.Group)`
  &&& {
    padding: 14px;
    margin: 0;
    position: absolute;
    background: #ffffff;
    border-radius: 5px;
    border-radius: 5px;
    box-shadow: 0px 7px 8px 0px #00000047;
    top: 100%;
    z-index: 10;
  }
`

const StyledList = styled.div`
  overflow-y: auto;
  max-height: 180px;
`
