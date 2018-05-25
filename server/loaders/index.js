import loaderById from './loaderById'
import loaderByPost from './loaderByPost'

export default () => ({
  userById: loaderById(),
  commentById: loaderById(),
  likeByPost: loaderByPost()
})
