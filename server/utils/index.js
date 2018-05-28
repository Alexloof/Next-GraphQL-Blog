import jwt from 'jsonwebtoken'

export const IsUserError = Symbol('IsUserError')

export class UserError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'Error'
    this.message = args[0]
    this[IsUserError] = true
    Error.captureStackTrace(this, 'Error')
  }
}

export const initUser = req => {
  // if session cookie authorization
  const cookieToken =
    req.request && req.request.session && req.request.session.token
      ? req.request.session.token
      : null

  if (cookieToken) {
    return jwt.verify(cookieToken, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        console.log('error', err)
        return null
      }
      return decoded.userId
    })
  } else {
    // if headers authorization
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
}
