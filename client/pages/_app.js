import App, { Container as NextContainer } from 'next/app'
import React, { Component } from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Container as StyledContainer } from 'semantic-ui-react'

import isAuth from '../lib/isAuth'

import Head from '../components/HeadData'
import Nav from '../components/Nav'

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
      <NextContainer>
        <ContextProvider>
          <ApolloProvider client={apolloClient}>
            <StyledContainer>
              <Head title="Next Graphql - Blogg" />
              <Nav {...propsWithClient} />
              <Component {...propsWithClient} />
            </StyledContainer>
          </ApolloProvider>
        </ContextProvider>
      </NextContainer>
    )
  }
}

export default withApolloClient(NextApp)
