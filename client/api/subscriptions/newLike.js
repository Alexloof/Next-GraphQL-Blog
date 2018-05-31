import gql from 'graphql-tag'

export const NEW_LIKE_SUB = gql`
  subscription newLike {
    newLike {
      _id
      post {
        _id
      }
    }
  }
`

export const newLikeUpdate = (prev, { subscriptionData }) => {
  if (!subscriptionData.data) return prev
  const newLike = subscriptionData.data.newLike

  const posts = [...prev.allPosts.posts]

  let likeExist = false
  posts.map(post => {
    if (post._id === newLike.post._id) {
      post.likes.map(like => {
        if (like._id === newLike._id) {
          likeExist = true
        }
      })
    }
  })

  if (!likeExist) {
    const newPosts = posts.map(
      post =>
        post._id === newLike.post._id
          ? { ...post, likes: [...post.likes, newLike] }
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
