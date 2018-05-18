const { GraphQLServer } = require('graphql-yoga')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const resolvers = require('./resolvers')

app.prepare().then(() => {
  const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers
  })

  const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground'
  }

  server.express.get('*', (req, res) => {
    return handle(req, res)
  })

  server.start(options, ({ port }) =>
    console.log(
      `Server started, listening on port ${port} for incoming requests.`
    )
  )
})
