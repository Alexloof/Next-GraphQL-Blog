import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
//import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const dev = process.env.NODE_ENV !== 'production'

function create(initialState) {
  const httpLink = new HttpLink({
    uri: dev ? process.env.API_URL_DEV : process.env.API_URL_PROD, // Server URL (must be absolute)
    credentials: 'include' // Additional fetch() options like `credentials` or `headers`
  })

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.map(({ message, locations, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       )
  //     )

  //   if (networkError) console.log(`[Network error]: ${networkError}`)
  // })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
