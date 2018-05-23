import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../db/models/User'

export const signup = async (_, { email, password, name }, ctx) => {
  try {
    const userModel = ctx.db.model('user')

    let user = await userModel.findOne({ email }).lean()

    if (user) {
      throw new Error('Email is already taken')
    }

    const createdAt = new Date()

    const hashedPassword = await bcrypt.hash(password, 10)
    user = await userModel.create({
      email,
      password: hashedPassword,
      name,
      createdAt
    })

    const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET)

    return { token, user }
  } catch (err) {
    throw new Error(err)
  }
}

export const login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email }, { password: 1 }).lean()
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
