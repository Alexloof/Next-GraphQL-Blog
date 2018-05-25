require('dotenv').config()

import { GraphQLServer, PubSub } from 'graphql-yoga'
import depthLimit from 'graphql-depth-limit'
import helmet from 'helmet'
import compression from 'compression'
import resolvers from './resolvers'
import typeDefs from './types'
import db from './db'
import { initUser } from './utils'
import createLoaders from './loaders'

const port = parseInt(process.env.PORT, 10) || 4000

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
  server.express.set('trust proxy', true)

  const options = {
    port
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
