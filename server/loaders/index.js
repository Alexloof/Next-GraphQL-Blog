import single from './single'
import multiple from './multiple'

export default () => ({
  // make unique dataloaders - else Cache problem can occur

  // for Post resolvers
  postedByById: single(),
  commentsByPost: multiple(),
  likesByPost: multiple(),

  // fpr User resolvers
  commentsByCommentedBy: multiple(),
  likesByLikedBy: multiple(),
  postsByPostedBy: multiple(),

  // for Like resolvers
  likedByById: single(),
  postById: single(),

  // for Comment resolvers
  postById2: single(),
  commentedByById: single(),

  user_ById: single(),
  comments_ByPost: multiple(),
  comments_ByCommentedBy: multiple(),
  likes_ByPost: multiple(),
  likes_ByLikedBy: multiple(),
  post_ById: single(),
  posts_ByPostedBy: multiple()
})
