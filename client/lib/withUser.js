import React from 'react'

import { Context } from '../context'

export default Page =>
  class BaseComponent extends React.Component {
    static async getInitialProps(ctx) {
      const props = {}

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {})
      }
      return props
    }

    render() {
      return (
        <Context.Consumer>
          {context => {
            return (
              <Page
                {...this.props}
                user={context ? context.state.user : ''}
                setUser={context ? context.actions.setUser : ''}
                clearUser={context ? context.actions.clearUser : ''}
              />
            )
          }}
        </Context.Consumer>
      )
    }
  }
