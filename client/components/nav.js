import Head from './head'
import Link from 'next/link'
import Router from 'next/router'
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'

class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => {
    this.props.client.resetStore().then(() => {
      localStorage.removeItem('user')
      Router.push('/logout')
    })
  }

  render() {
    const { isAuth } = this.props
    const { activeItem } = this.state

    return (
      <nav>
        <Menu pointing secondary>
          <Link prefetch href="/">
            <StyledLink>Feed</StyledLink>
          </Link>
          {isAuth && (
            <Link prefetch href="/user">
              <StyledLink>User</StyledLink>
            </Link>
          )}
          <Menu.Menu position="right">
            {!isAuth && (
              <Link prefetch href="/login">
                <StyledLink>Login</StyledLink>
              </Link>
            )}
            {!isAuth && (
              <Link prefetch href="/signup">
                <StyledLink>Signup</StyledLink>
              </Link>
            )}
            {isAuth && <StyledLink onClick={this.logout}>Logout</StyledLink>}
          </Menu.Menu>
        </Menu>
      </nav>
    )
  }
}

const StyledLink = styled.a`
  color: #5f5f5f;
  line-height: 70px;
  padding: 0 20px;
  cursor: pointer;
`

export default Nav
