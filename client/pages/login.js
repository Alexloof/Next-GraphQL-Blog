import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { Button, Form, Loader, Message, Header } from 'semantic-ui-react'

import withUser from '../lib/withUser'
import parseError from '../lib/parseError'

import GoogleLoginButton from '../components/GoogleLoginButton'
import StyledSignForm from '../components/StyledSignForm'

import { LOGIN_MUTATION } from '../api/mutations/user/login'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (e, login) => {
    e.preventDefault()

    try {
      const { data } = await login()

      Router.push('/authcallback')
    } catch (error) {
      this.setState({
        password: ''
      })
    }
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }}>
        {(login, { loading, error, data }) => (
          <Container>
            <StyledSignForm
              error={!!error}
              onSubmit={e => this.handleSubmit(e, login)}
            >
              <Header size="large">Login</Header>
              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Please enter your email"
                  autoComplete="email"
                  value={this.state.email}
                />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Please enter your password"
                  autoComplete="password"
                  type="password"
                  value={this.state.password}
                />
              </Form.Field>

              {error && (
                <Message
                  error
                  header="Ooops!"
                  content={parseError(error.message)}
                />
              )}
              {loading ? (
                <StyledLoader active inline />
              ) : (
                <LoginButton type="submit">Login</LoginButton>
              )}
              <Link href="/signup">
                <a>No account? Click here to create an account</a>
              </Link>
              <GoogleLoginButton text="Login with Google" />
            </StyledSignForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

export default withUser(Login)

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(200px + 40vh);
`

const LoginButton = styled(Button)`
  &&& {
    width: 100%;
    height: 40px;
    background: #f5ca66;
    margin: 15px 0px;
  }
`
const StyledLoader = styled(Loader)`
  align-self: center;
`
