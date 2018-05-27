import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import React, { Component } from 'react'

import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export default class Home extends Component {
  static async getInitialProps(ctx) {
    console.log('ctx', ctx)

    return {}
  }
  render() {
    return (
      <div>
        <Head title="Home" />
        <Nav />

        <div className="hero">
          <StyledHeader>Welcome to Nextssss!</StyledHeader>
          <Button content="Primary" primary />
          <p className="description">
            To get started, edit <code>pages/index.js</code> and save to reload.
          </p>

          <div className="row">
            <Link href="https://github.com/zeit/next.js#getting-started">
              <a className="card">
                <h3>Getting Started &rarr;</h3>
                <p>Learn more about Next on Github and in their examples</p>
              </a>
            </Link>
            <Link href="https://open.segment.com/create-next-app">
              <a className="card">
                <h3>Examples &rarr;</h3>
                <p>
                  Find other example boilerplates on the{' '}
                  <code>create-next-app</code> site
                </p>
              </a>
            </Link>
            <Link href="https://github.com/segmentio/create-next-app">
              <a className="card">
                <h3>Create Next App &rarr;</h3>
                <p>Was this tool helpful? Let us know how we can improve it</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
const StyledHeader = styled.h1`
  font-size: 50px;
  color: green;
`
