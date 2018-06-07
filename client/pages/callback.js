import React, { Component } from 'react'
import Router from 'next/router'

import { GET_CURRENT_USER } from '../api/queries/user/getCurrentUser'
import withUser from '../lib/withUser'

class AuthCallback extends Component {
  static getInitialProps(ctx) {
    // make the token available in the client also
    const token = ctx.query.token ? ctx.query.token : null
    return {
      token
    }
  }
  async componentDidMount() {
    if (this.props.token) {
      localStorage.setItem('token', this.props.token)
    }

    const { data } = await this.props.client.query({
      query: GET_CURRENT_USER
    })

    if (data.currentUser) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.currentUser._id,
          name: data.currentUser.name,
          email: data.currentUser.email,
          googleId: data.currentUser.googleId
        })
      )

      this.props.setUser({
        _id: data.currentUser._id,
        name: data.currentUser.name,
        email: data.currentUser.email,
        googleId: data.currentUser.googleId
      })
    }

    Router.replace('/')
  }
  render() {
    return null
  }
}

export default withUser(AuthCallback)
