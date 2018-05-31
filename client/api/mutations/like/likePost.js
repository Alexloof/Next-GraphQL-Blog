import gql from 'graphql-tag'

import ALL_POSTS from '../../queries/post/allPosts'

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      post {
        _id
      }
      likedBy {
        _id
        name
      }
    }
  }
`

const fakeId = Math.round(Math.random() * -1000000)

export const likePostOptions = props => {
  const { _id, user } = props
  return {
    optimisticResponse: {
      __typename: 'Mutation',
      likePost: {
        __typename: 'Like',
        _id: fakeId,
        post: {
          __typename: 'Post',
          _id: _id
        },
        likedBy: {
          __typename: 'User',
          _id: user._id,
          name: user.name
        }
      }
    },
    update: (cache, { data: { likePost } }) => {
      const { allPosts } = cache.readQuery({
        query: ALL_POSTS,
        variables: { sort: '-createdAt' }
      })

      // takes a reference of the post we want
      const updatedPost = allPosts.posts.find(post => post._id === _id)

      const likeExist = updatedPost.likes.filter(
        like => like._id === likePost._id
      )

      // if same like already exist in the cache - mutation update vs sub problem
      if (likeExist.length === 0) {
        // mutates the reference
        updatedPost.likes = [...updatedPost.likes, likePost]
      }

      cache.writeQuery({
        query: ALL_POSTS,
        data: {
          allPosts: {
            __typename: 'PostFeed',
            count: allPosts.count,
            posts: [...allPosts.posts]
          }
        }
      })
    }
  }
}
