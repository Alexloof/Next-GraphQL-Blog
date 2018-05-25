import newPost from './newPost'
import newLike from './newLike'
import newComment from './newComment'

export default {
  Subscription: {
    ...newPost,
    ...newLike,
    ...newComment
  }
}
