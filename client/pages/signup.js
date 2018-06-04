import React, { Component } from 'react'
import { graphql, compose, Query, Mutation } from 'react-apollo'
import Router from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { Button, Form, Loader, Message, Header } from 'semantic-ui-react'

import withUser from '../lib/withUser'

import GoogleLoginButton from '../components/GoogleLoginButton'
import StyledSignForm from '../components/StyledSignForm'

import { SIGNUP_MUTATION } from '../api/mutations/user/signup'

class Login extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (e, signup) => {
    e.preventDefault()

    try {
      const { data } = await signup()

      Router.push('/authcallback')
    } catch (error) {
      this.setState({
        email: '',
        password: '',
        name: ''
      })
    }
  }

  render() {
    const { email, password, name } = this.state
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{ email, password, name }}
      >
        {(signup, { loading, error, data }) => (
          <Container>
            <StyledSignForm
              error={!!error}
              onSubmit={e => this.handleSubmit(e, signup)}
            >
              <Header size="large">Signup</Header>
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
                <label>Name</label>
                <input
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Please enter your name"
                  autoComplete="name"
                  value={this.state.name}
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
                <Message error header="Ooops!" content={error.message} />
              )}
              {loading ? (
                <StyledLoader active inline />
              ) : (
                <LoginButton type="submit">Signup</LoginButton>
              )}
              <Link href="/login">
                <a>Have an account? Click here to login</a>
              </Link>
              <GoogleLoginButton text="Signup with Google" />
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
