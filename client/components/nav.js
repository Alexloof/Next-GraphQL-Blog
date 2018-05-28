import Head from './head'
import Link from 'next/link'

import Router from 'next/router'

const logout = () => {
  localStorage.removeItem('userId')
  Router.push('/logout')
}

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
        <a onClick={() => logout()}>Logout</a>
      </li>
    </ul>
  </nav>
)

export default Nav
