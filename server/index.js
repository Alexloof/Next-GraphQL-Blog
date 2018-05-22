import { GraphQLServer } from 'graphql-yoga'

const port = parseInt(process.env.PORT, 10) || 4000

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

const options = {
  port
}

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
