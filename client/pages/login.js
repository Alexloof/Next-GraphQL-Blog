import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'

import withUser from '../lib/withUser'

import { Button, Form, Loader, Message, Header } from 'semantic-ui-react'

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

    const { email, password } = this.state

    try {
      const { data } = await login()

      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.login.user._id,
          email: data.login.user.email,
          name: data.login.user.name
        })
      )

      this.props.setUser({
        _id: data.login.user._id,
        email: data.login.user.email,
        name: data.login.user.name
      })

      Router.push('/')
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
            <StyledForm
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
                <Message error header="Ooops!" content={error.message} />
              )}
              {loading ? (
                <StyledLoader active inline />
              ) : (
                <LoginButton type="submit">Login</LoginButton>
              )}
              <Link href="/signup">
                <a>No account? Click here to create an account</a>
              </Link>
            </StyledForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`

export default withUser(Login)

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(200px + 40vh);
`
const StyledForm = styled(Form)`
  &&& {
    background-color: #fdfdfd;
    border-radius: 3px;
    box-shadow: 0px 0px 0px 1px #75757533;
    padding: 40px;
    width: 550px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & .field label,
    .header.large {
      color: #7d7d7d;
    }
  }
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
