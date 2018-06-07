import cookie from 'cookie'

export default ctx => {
  const isFromServer = !!ctx.req

  let isAuth = false
  if (isFromServer) {
    if (ctx.req.cookies['next-graphql.sid']) {
      isAuth = true
    } else {
      const cookies =
        ctx.req.headers && ctx.req.headers.cookie
          ? cookie.parse(ctx.req.headers.cookie, {})
          : null
      if (cookies && cookies['next-graphql.sid']) {
        isAuth = true
      }
    }
  } else {
    if (localStorage.getItem('user')) isAuth = true
  }

  return isAuth
}
