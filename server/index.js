require('dotenv').config()

import { GraphQLServer, PubSub } from 'graphql-yoga'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import depthLimit from 'graphql-depth-limit'
import helmet from 'helmet'
import compression from 'compression'

import initGoogleAuth from './auth/google'
import passport from 'passport'
import resolvers from './resolvers'
import typeDefs from './types'
import db from './db'
import { initUser } from './utils'
import createLoaders from './loaders'

const dev = process.env.NODE_ENV !== 'production'

const startServer = async () => {
  const initDB = await db()

  const pubsub = new PubSub()

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async req => ({
      ...req,
      pubsub,
      loaders: createLoaders(),
      user: initUser(req),
      db: initDB
    }),
    validationRules: [depthLimit(10)]
  })

  server.express.use(compression())
  server.express.use(helmet())
  server.express.use(cookieParser())

  const ONE_YEAR = 31556952000

  if (!dev) {
    server.express.set('trust proxy', 1)
  }

  server.express.use(passport.initialize())

  initGoogleAuth(server.express)

  const corsOptions = {
    origin: dev ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD,
    credentials: true
  }

  //option object for graphql yoga
  const port = parseInt(process.env.PORT, 10) || 4000
  const options = {
    port,
    cors: corsOptions
  }

  server.start(options, ({ port }) =>
    console.log(
      `Server started, listening on port ${port} for incoming requests. [${
        process.env.NODE_ENV
      }]`
    )
  )
}

startServer()
