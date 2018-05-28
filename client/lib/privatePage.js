import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import cookie from 'cookie'

let globalUser = null

export default Page =>
  class BaseComponent extends React.Component {
    static defaultProps = {
      user: null
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req

      let isAuth = false

      if (isFromServer) {
        const cookies =
          ctx.req.headers && ctx.req.headers.cookie
            ? cookie.parse(ctx.req.headers.cookie, {})
            : null
        if (cookies && cookies['next-graphql.sid']) {
          isAuth = true
        }
      } else {
        if (localStorage.getItem('userId')) isAuth = true
      }

      const props = { isAuth, isFromServer }

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {})
      }

      return props
    }

    componentDidMount() {
      const { isAuth, isFromServer } = this.props

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
