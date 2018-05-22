import { GraphQLServer } from 'graphql-yoga'

const port = parseInt(process.env.PORT, 10) || 4000

import resolvers from './resolvers'

const server = new GraphQLServer({ typeDefs: './schema.graphql', resolvers })

const options = {
  port
}

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
