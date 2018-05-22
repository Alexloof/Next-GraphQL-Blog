require('dotenv').config()

import { GraphQLServer } from 'graphql-yoga'
import helmet from 'helmet'
import compression from 'compression'
import resolvers from './resolvers'
import initDB from './db'

const port = parseInt(process.env.PORT, 10) || 4000

initDB()

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({ ...req })
})

server.express.use(compression())
server.express.use(helmet())

const options = {
  port
}

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
