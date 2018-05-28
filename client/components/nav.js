import Head from './head'
import Link from 'next/link'
import { withApollo } from 'react-apollo'
import Router from 'next/router'

const logout = client => {
  client.resetStore()
  localStorage.removeItem('userId')
  Router.push('/logout')
}

const Nav = props => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
        <Link prefetch href="/user">
          <a>User</a>
        </Link>
        <Link prefetch href="/login">
          <a>Login</a>
        </Link>
        <a onClick={() => logout(props.client)}>Logout</a>
      </li>
    </ul>
  </nav>
)

export default withApollo(Nav)
