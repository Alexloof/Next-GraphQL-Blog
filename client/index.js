const express = require('express')
const next = require('next')
const cookie = require('cookie')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const sitemapAndRobots = require('./lib/sitemapAndRobots')
const { join } = require('path')
const { parse } = require('url')

const ONE_YEAR = 31556952000

const port = parseInt(process.env.PORT, 10) || 3000

const dev = process.env.NODE_ENV !== 'production'

const ROOT_URL = dev
  ? `http://localhost:${port}`
  : 'https://next-graphql.now.sh'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(compression())

  if (!dev) {
    server.set('trust proxy', 1)
  }

  server.use(cookieParser())

  server.get('/logout', (req, res) => {
    res.clearCookie('next-graphql.sid')
    return res.redirect('/')
  })

  server.get('/authcallback', (req, res) => {
    const token = req.query.token
    if (token) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('next-graphql.sid', String(token), {
          httpOnly: true,
          secure: dev ? false : true,
          maxAge: ONE_YEAR
        })
      )
    }
    return res.redirect(`/callback?token=${token}`)
  })

  sitemapAndRobots({ server })

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)

      app.serveStatic(req, res, filePath)
    } else {
      return handle(req, res)
    }
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on ${ROOT_URL}. [${process.env.NODE_ENV}]`)
  })
})
