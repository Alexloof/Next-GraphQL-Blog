import gql from 'graphql-tag'

import ALL_POSTS from '../../queries/post/allPosts'

export const COMMENT_POST = gql`
  mutation commentPost($postId: ID!, $text: String) {
    commentPost(postId: $postId, text: $text) {
      _id
      createdAt
      text
      commentedBy {
        _id
        name
      }
      post {
        _id
      }
    }
  }
`

const fakeId = Math.round(Math.random() * -1000000)

export const commentPostOptions = (props, input) => {
  const { postId, user } = props
  return {
    optimisticResponse: {
      __typename: 'Mutation',
      commentPost: {
        __typename: 'Comment',
        _id: fakeId,
        createdAt: new Date(),
        text: input,
        commentedBy: {
          _id: user._id,
          __typename: 'User',
          name: user.name
        },
        post: {
          _id: postId,
          __typename: 'Post'
        }
      }
    },
    update: (cache, { data: { commentPost } }) => {
      const { allPosts } = cache.readQuery({
        query: ALL_POSTS,
        variables: { sort: '-createdAt' }
      })

      // takes a reference of the post we want
      const updatedPost = allPosts.posts.find(post => post._id === postId)

      const commentExist = updatedPost.comments.filter(
        comment => comment._id === commentPost._id
      )

      if (commentExist.length === 0) {
        // mutate the newly created post with en user_id so it matches the query
        commentPost.commentedBy._id = user._id

        // mutates the reference
        updatedPost.comments = [...updatedPost.comments, commentPost]
      }

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
    }
  }
}
