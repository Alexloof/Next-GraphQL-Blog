import auth from './auth'
import post from './post'

export default {
  Mutation: {
    ...auth,
    ...post
  }
}
