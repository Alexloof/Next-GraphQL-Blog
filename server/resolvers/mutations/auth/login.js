import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async (_, { email, password }, ctx) => {
  try {
    const userModel = ctx.db.model('user')
    const user = await userModel.findOne({ email }, { password: 1 }).lean()
    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    // remove password from user object to limit scope (security)
    user.password = undefined

    return {
      token: jwt.sign({ userId: user._id }, process.env.AUTH_SECRET),
      user
    }
  } catch (err) {
    throw new Error(err)
  }
}
