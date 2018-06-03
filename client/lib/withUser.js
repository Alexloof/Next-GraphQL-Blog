import React from 'react'

import { Context } from '../context'

export default function withUser(WrappedComponent) {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const props = {}

      if (WrappedComponent.getInitialProps) {
        Object.assign(
          props,
          (await WrappedComponent.getInitialProps(ctx)) || {}
        )
      }

      return props
    }
    render() {
      if (process.browser) {
        return (
          <Context.Consumer>
            {context => {
              return (
                <WrappedComponent
                  {...this.props}
                  user={context ? context.state.user : ''}
                  setUser={context ? context.actions.setUser : ''}
                  clearUser={context ? context.actions.clearUser : ''}
                />
              )
            }}
          </Context.Consumer>
        )
      } else {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
