import allUsers from './allUsers'
import currentUser from './currentUser'
import posts from './posts'

export default {
  Query: {
    allUsers,
    currentUser
  },
  User: {
    likes: () => [],
    comments: () => [],
    posts
  }
}
