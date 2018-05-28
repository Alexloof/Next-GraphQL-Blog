import App, { Container } from 'next/app'
import React, { Component } from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'

import isAuth from '../lib/isAuth'

import Nav from '../components/nav'

import ContextProvider from '../context'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class NextApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const isAuthenticated = isAuth(ctx)

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps: { ...pageProps, isAuth: isAuthenticated } }
  }
  render() {
    const { Component, pageProps, apolloClient } = this.props
    const propsWithClient = {
      ...pageProps,
      client: apolloClient
    }
    return (
      <Container>
        <ContextProvider>
          <ApolloProvider client={apolloClient}>
            <div>
              <Nav {...propsWithClient} />
              <Component {...propsWithClient} />
            </div>
          </ApolloProvider>
        </ContextProvider>
      </Container>
    )
  }
}

export default withApolloClient(NextApp)
