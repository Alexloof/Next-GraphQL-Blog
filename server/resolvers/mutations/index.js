import auth from './auth'
import post from './post'
import comment from './comment'
import like from './like'
import user from './user'

export default {
  Mutation: {
    ...auth,
    ...post,
    ...comment,
    ...like,
    ...user
  }
}
