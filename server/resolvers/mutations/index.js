import auth from './auth'
import post from './post'
import comment from './comment'
import like from './like'

export default {
  Mutation: {
    ...auth,
    ...post,
    ...comment,
    ...like
  }
}
