import React, { Component } from 'react'
import { graphql, compose, Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'

import withUser from '../lib/withUser'

import { Color } from '../styles/variables'

import { Button, Form, Loader, Message, Header } from 'semantic-ui-react'

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

    const { email, password, name } = this.state

    try {
      const { data } = await signup()

      localStorage.setItem('userId', data.signup.user._id)

      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.signup.user._id,
          email: data.signup.user.email,
          name: data.signup.user.name
        })
      )

      this.props.setUser({
        _id: data.signup.user._id,
        email: data.signup.user.email,
        name: data.signup.user.name
      })

      Router.push('/')
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
          <Container color={Color}>
            <StyledForm
              color={Color}
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
            </StyledForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
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
