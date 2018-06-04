import jwt from 'jsonwebtoken'

export const initUser = req => {
  // if social media signup/login (with passport js)
  if (req.request && req.request.user) {
    // PS. user._id comes as an object from passport js
    return req.request.user._id.toString()
  }

  // if session cookie authorization
  const cookieToken =
    req.request && req.request.session && req.request.session.token
      ? req.request.session.token
      : null

  // if local signup/signin
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
