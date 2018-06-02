import gql from 'graphql-tag'

import { POSTS_LIMIT } from '../../constants'

import ALL_POSTS from '../../queries/post/allPosts'

export const DELETE_POST = gql`
  mutation deletePost($_id: String!) {
    deletePost(_id: $_id) {
      _id
    }
  }
`

export const deletePostOptions = props => {
  const { _id } = props
  return {
    update: (cache, { data: { deletePost } }) => {
      const { allPosts } = cache.readQuery({
        query: ALL_POSTS,
        variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' }
      })

      const updatedPosts = allPosts.posts.filter(post => post._id !== _id)

      cache.writeQuery({
        query: ALL_POSTS,
        variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' },
        data: {
          allPosts: {
            __typename: 'PostFeed',
            count: allPosts.count - 1,
            posts: [...updatedPosts]
          }
        }
      })
    }
  }
}
