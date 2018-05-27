import React, { Component } from 'react'
import { graphql, compose, Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import {
  Button,
  Form,
  Loader,
  Message,
  Transition,
  Header
} from 'semantic-ui-react'

import { Color } from '../styles/variables'

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    errorMessage: '',
    errorShake: true
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, errorMessage: '' })
  }

  handleSubmit = async event => {
    const { email, password, errorShake } = this.state
    event.preventDefault()
    if (!email || !password) {
      return this.setState({
        errorMessage: 'You must provide login credentials',
        errorShake: !errorShake
      })
    }

    this.setState({ isLoading: true, errorMessage: '' })

    //console.log(this.props)
    try {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      })
      console.log('cookie', document.cookie)
    } catch (error) {
      console.log(error)
    }

    // const user = await login(this.state.email, this.state.password)

    // // set token in sessionStorage
    // if (user.token) {
    //   this.persistUser(user)
    //   this.props.history.push('/')
    // } else {
    //   this.setState({
    //     isLoading: false,
    //     errorMessage: 'Login failed',
    //     errorShake: !this.state.errorShake
    //   })
    // }
  }

  // persistUser = user => {
  //   sessionStorage.setItem('admin-user', JSON.stringify(user))
  // }

  render() {
    return (
      <Container color={Color}>
        <Transition
          animation={'shake'}
          duration={600}
          visible={this.state.errorShake}
        >
          <StyledForm
            color={Color}
            error={!!this.state.errorMessage}
            onSubmit={this.handleSubmit}
          >
            <Header size="large">Next Graphql Blog</Header>
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
            {this.state.errorMessage && (
              <Message
                error
                header="Ooops!"
                content={this.state.errorMessage}
              />
            )}
            {this.state.isLoading ? (
              <StyledLoader active inline />
            ) : (
              <LoginButton type="submit">Login</LoginButton>
            )}
          </StyledForm>
        </Transition>
      </Container>
    )
  }
}

const ALL_POSTS = gql`
  {
    allposts {
      count
      posts {
        _id
        name
      }
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`

export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(Login)

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.color.primaryDark};
  height: 100vh;
`
const StyledForm = styled(Form)`
  &&& {
    background-color: ${props => props.color.primaryLight};
    border-radius: 3px;
    box-shadow: 2px 2px 4px 2px #0a0a0a6b;
    padding: 20px;
    width: 450px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & .field label,
    .header.large {
      color: ${props => props.color.textGray};
    }
  }
`
const LoginButton = styled(Button)`
  width: 100%;
`
const StyledLoader = styled(Loader)`
  align-self: center;
`
