import { merge } from 'lodash'

import user from './user'
import post from './post'

export default merge(user, post)
