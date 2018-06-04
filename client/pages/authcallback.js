import React, { Component } from 'react'
import Router from 'next/router'

import { GET_CURRENT_USER } from '../api/queries/user/getCurrentUser'

class AuthCallback extends Component {
  async componentDidMount() {
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
    }

    Router.replace('/')
  }
  render() {
    return null
  }
}

export default AuthCallback
