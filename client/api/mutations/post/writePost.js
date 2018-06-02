import gql from 'graphql-tag'

import ALL_POSTS from '../../queries/post/allPosts'

import { POSTS_LIMIT } from '../../constants'

export const WRITE_POST = gql`
  mutation writePost($name: String!, $content: String!, $image: String) {
    writePost(name: $name, content: $content, image: $image) {
      _id
      name
      createdAt
      content
      image
      postedBy {
        _id
        name
      }
    }
  }
`

export const writePostOptions = props => {
  return {
    update: (cache, { data: { writePost } }) => {
      const { allPosts } = cache.readQuery({
        query: ALL_POSTS,
        variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' }
      })

      writePost.likes = []
      writePost.comments = []

      allPosts.posts.unshift(writePost)
      allPosts.posts.pop()

      cache.writeQuery({
        query: ALL_POSTS,
        variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' },
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
