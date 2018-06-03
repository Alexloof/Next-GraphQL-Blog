import bcrypt from 'bcryptjs'

export default async (parent, { name, email, password, newPassword }, ctx) => {
  try {
    if (!ctx.user) throw new Error('Not authenticated')

    const userModel = ctx.db.model('user')

    let user = await userModel
      .findOne({ _id: ctx.user }, { password: 1 })
      .lean()
    if (!user) {
      return new Error('No such user found')
    }

    const modifier = {}

    if (password) {
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        return new Error('Invalid password')
      }

      if (newPassword) {
        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        modifier.password = newHashedPassword
      } else {
        return new Error('You have to come up with a new password')
      }
    }

    if (name) {
      modifier.name = name
    }

    if (email) {
      modifier.email = email
    }

    modifier.updatedAt = new Date()

    user = await userModel.findOneAndUpdate({ _id: ctx.user }, modifier, {
      new: true
    })

    return user
  } catch (error) {
    throw new Error(error)
  }
}
