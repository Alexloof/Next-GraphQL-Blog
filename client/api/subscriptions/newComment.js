import gql from 'graphql-tag'

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
