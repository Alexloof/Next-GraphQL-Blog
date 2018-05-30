import React, { Component } from 'react'
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import { Mutation } from 'react-apollo'

import withUser from '../lib/withUser'

import ALL_POSTS from '../api/queries/post/allPosts'
import COMMENT_POST from '../api/mutations/comment/commentPost'

const fakeId = Math.round(Math.random() * -1000000)

class CommentList extends Component {
  state = {
    input: ''
  }

  writeComment = (e, commentPost) => {
    e.preventDefault()
    const { input } = this.state
    if (!input) return

    commentPost()

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
        optimisticResponse={{
          __typename: 'Mutation',
          commentPost: {
            __typename: 'Comment',
            _id: fakeId,
            createdAt: new Date(),
            text: this.state.input,
            commentedBy: {
              _id: user._id,
              __typename: 'User',
              name: user.name
            }
          }
        }}
        update={(cache, { data: { commentPost } }) => {
          const { allPosts } = cache.readQuery({
            query: ALL_POSTS,
            variables: { sort: '-createdAt' }
          })

          // takes a reference of the post we want
          const updatedPost = allPosts.posts.find(post => post._id === postId)

          // mutate the newly created post with en user_id so it matches the query
          commentPost.commentedBy._id = user._id

          // mutates the reference
          updatedPost.comments = [...updatedPost.comments, commentPost]

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
