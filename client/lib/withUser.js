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
      console.log(this.props)
      return (
        <Context.Consumer>
          {context => {
            if (context) {
              return (
                <WrappedComponent
                  {...this.props}
                  user={context.state.user}
                  setUser={context.actions.setUser}
                  clearUser={context.actions.clearUser}
                />
              )
            }
          }}
        </Context.Consumer>
      )
    }
  }
}
