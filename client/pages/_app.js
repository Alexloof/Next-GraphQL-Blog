import App, { Container as NextContainer } from 'next/app'
import React, { Component } from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Container as SContainer } from 'semantic-ui-react'
import Alert from 'react-s-alert'
import styled from 'styled-components'

import * as gtag from '../lib/gtag'

import isAuth from '../lib/isAuth'

import Head from '../components/HeadData'
import Nav from '../components/Nav'

import ContextProvider from '../context'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = url => {
  gtag.pageview(url)
  NProgress.done()
}
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
              <Head />
              <Nav {...propsWithClient} />
              <Component {...propsWithClient} />
              <Alert stack={{ limit: 3 }} />
            </StyledContainer>
          </ApolloProvider>
        </ContextProvider>
      </NextContainer>
    )
  }
}

export default withApolloClient(NextApp)

const StyledContainer = styled(SContainer)`
  &&& {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`
