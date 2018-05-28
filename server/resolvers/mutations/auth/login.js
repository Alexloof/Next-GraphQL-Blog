import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { UserError } from '../../../utils'

export default async (_, { email, password }, ctx) => {
  try {
    const userModel = ctx.db.model('user')
    const user = await userModel.findOne({ email }, { password: 1 }).lean()
    if (!user) {
      return new UserError('No such user found')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return new UserError('Invalid password')
    }

    // remove password from user object to limit scope (security)
    user.password = undefined

    const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET)
    ctx.request.session.token = token
    return {
      token,
      user
    }
  } catch (err) {
    return new UserError(err)
  }
}
