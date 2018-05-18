const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

import next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

import resolvers from './resolvers'
import typeDefs from './schema'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.prepare().then(() => {
  const server = express()

  server.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => {
      return {
        schema
        // other options here
      }
    })
  )

  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, () => {
    console.log(`🚀 Server ready at /3000`)
  })
})
