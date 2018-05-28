import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'

import Nav from '../components/nav'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <div>
            <Nav {...pageProps} />
            <Component {...pageProps} />
          </div>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
