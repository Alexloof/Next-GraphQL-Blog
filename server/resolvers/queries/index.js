import { merge } from 'lodash'

import user from './user'
import post from './post'
import comment from './comment'

export default merge(user, post, comment)
