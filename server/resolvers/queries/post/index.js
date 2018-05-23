import allPosts from './allPosts'
import postById from './postById'
import postedBy from './postedBy'
import comments from './comments'

export default {
  Query: {
    allPosts,
    postById
  },
  Post: {
    postedBy,
    comments,
    likes: () => []
  }
}
