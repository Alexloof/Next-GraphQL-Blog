import allUsers from './allUsers'
import currentUser from './currentUser'
import posts from './posts'
import comments from './comments'

export default {
  Query: {
    allUsers,
    currentUser
  },
  User: {
    likes: () => [],
    comments,
    posts
  }
}
