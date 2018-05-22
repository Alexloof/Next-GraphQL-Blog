import jwt from 'jsonwebtoken'

export const getUserId = context => {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.AUTH_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}
