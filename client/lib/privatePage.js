import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

export default Page =>
  class BaseComponent extends React.Component {
    static async getInitialProps(ctx) {
      const props = {}

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {})
      }
      return props
    }

    componentDidMount() {
      const { isAuth } = this.props

      if (!isAuth) {
        Router.push('/login')
        return
      }
    }

    render() {
      const { isAuth } = this.props
      if (!isAuth) {
        return null
      }

      return <Page {...this.props} />
    }
  }
