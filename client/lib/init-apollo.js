import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const dev = process.env.NODE_ENV !== 'production'

function create(initialState, { getToken }) {
  const httpLink = new HttpLink({
    uri: dev ? process.env.API_URL_DEV : process.env.API_URL_PROD, // Server URL (must be absolute)
    credentials: 'include' // Additional fetch() options like `credentials` or `headers`
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        Cookie: token
      }
    }
  })

  const httpLinkWithAuthToken = authLink.concat(httpLink)

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: dev ? process.env.API_WS_URL_DEV : process.env.API_WS_URL_PROD,
        options: {
          reconnect: true
        }
      })
    : null

  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLinkWithAuthToken
      )
    : httpLinkWithAuthToken

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: link,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
