import single from './single'
import multiple from './multiple'

export default () => ({
  // post
  userById: single(),
  commentByPost: multiple(),
  likeByPost: multiple(),

  // user
  commentByCommentedBy: multiple(),
  likesByLikedBy: multiple(),
  postsByPostedBy: multiple()
})
