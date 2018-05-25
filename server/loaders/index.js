import single from './single'
import multiple from './multiple'

export default () => ({
  // make unique dataloaders - else Cache problem can occur

  user_ById: single(),
  comments_ByPost: multiple(),
  comments_ByCommentedBy: multiple(),
  likes_ByPost: multiple(),
  likes_ByLikedBy: multiple(),
  post_ById: single(),
  posts_ByPostedBy: multiple()
})
