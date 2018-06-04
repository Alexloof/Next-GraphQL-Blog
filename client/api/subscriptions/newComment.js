import gql from 'graphql-tag'
import { showSuccessAlert } from '../../lib/alerts'

export const NEW_COMMENT_SUB = gql`
  subscription newComment {
    newComment {
      _id
      createdAt
      text
      post {
        _id
      }
      commentedBy {
        _id
        name
      }
    }
  }
`

export const newCommentUpdate = (prev, { subscriptionData }) => {
  if (!subscriptionData.data) return prev
  const newComment = subscriptionData.data.newComment

  const posts = [...prev.allPosts.posts]

  let commentExist = false
  posts.map(post => {
    if (post._id === newComment.post._id) {
      post.comments.map(comment => {
        if (comment._id === newComment._id) {
          commentExist = true
        }
      })
    }
  })

  if (!commentExist) {
    const newPosts = posts.map(
      post =>
        post._id === newComment.post._id
          ? { ...post, comments: [...post.comments, newComment] }
          : post
    )

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      if (newComment.commentedBy._id != user._id) {
        showSuccessAlert(`New comment from ${newComment.commentedBy.name}`)
      }
    } else {
      showSuccessAlert(`New comment from ${newComment.commentedBy.name}`)
    }

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
