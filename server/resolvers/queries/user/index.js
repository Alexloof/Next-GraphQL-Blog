import allUsers from './allUsers'
import currentUser from './currentUser'

export default {
  Query: {
    allUsers,
    currentUser
  },
  User: {
    likes: () => []
  }
}
