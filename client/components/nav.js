import Head from './head'
import Link from 'next/link'
import Router from 'next/router'
import React, { Component } from 'react'

class Nav extends Component {
  logout = () => {
    this.props.client.resetStore().then(() => {
      localStorage.removeItem('user')
      Router.push('/logout')
    })
  }
  render() {
    const { isAuth } = this.props
    return (
      <nav>
        <ul>
          <li>
            <Link prefetch href="/">
              <a>Home</a>
            </Link>
            {isAuth && (
              <Link prefetch href="/user">
                <a>User</a>
              </Link>
            )}
            {!isAuth && (
              <Link prefetch href="/login">
                <a>Login</a>
              </Link>
            )}
            {!isAuth && (
              <Link prefetch href="/signup">
                <a>Signup</a>
              </Link>
            )}
            {isAuth && <a onClick={this.logout}>Logout</a>}
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
