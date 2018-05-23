import auth from './auth'
import post from './post'
import comment from './comment'

export default {
  Mutation: {
    ...auth,
    ...post,
    ...comment
  }
}
