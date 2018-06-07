import jwt from 'jsonwebtoken'

export const initUser = req => {
  const Authorization =
    req.request && req.request.headers && req.request.headers.authorization
      ? req.request.headers.authorization
      : null

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    return jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        console.log('error', err)
        return null
      }
      return decoded.userId
    })
  }
  return null
}
