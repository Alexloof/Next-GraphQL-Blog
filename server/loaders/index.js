import userLoader from './userLoader'
import likeLoader from './likeLoader'
import commentLoader from './commentLoader'

export default () => ({
  user: userLoader,
  like: likeLoader,
  comment: commentLoader
})
