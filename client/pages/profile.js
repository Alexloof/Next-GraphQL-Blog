import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'

import { Form, Header, Input, Button, Loader, Message } from 'semantic-ui-react'

import privatePage from '../lib/privatePage'
import withUser from '../lib/withUser'

import { UPDATE_USER } from '../api/mutations/user/updateUser'
import { GET_CURRENT_USER } from '../api/queries/user/getCurrentUser'

class Profile extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    newPassword: ''
  }

  handleSubmit = async (e, updateUser) => {
    e.preventDefault()
    try {
      const { data } = await updateUser()

      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.updateUser._id,
          email: data.updateUser.email,
          name: data.updateUser.name
        })
      )

      this.props.setUser({
        _id: data.updateUser._id,
        email: data.updateUser.email,
        name: data.updateUser.name
      })

      this.setState({
        name: data.updateUser.name,
        email: data.updateUser.email,
        password: '',
        newPassword: ''
      })
    } catch (error) {
      console.log(error)
      this.setState({
        password: '',
        newPassword: ''
      })
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { name, email, password, newPassword } = this.state

    return (
      <Query query={GET_CURRENT_USER}>
        {({ data: { currentUser } }) => (
          <Mutation
            mutation={UPDATE_USER}
            variables={{ name, email, password, newPassword }}
          >
            {(updateUser, { loading, error }) => (
              <Container>
                <Form
                  error={!!error}
                  onSubmit={e => this.handleSubmit(e, updateUser)}
                >
                  <Header size="large">Profile</Header>
                  <Form.Field>
                    <label>Name</label>
                    <Input
                      name="name"
                      onChange={this.handleChange}
                      placeholder="What is your name?"
                      autoComplete="name"
                      value={name || currentUser.name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <Input
                      name="email"
                      onChange={this.handleChange}
                      placeholder="What is your email?"
                      autoComplete="email"
                      value={email || currentUser.email}
                    />
                  </Form.Field>
                  <Header size="medium">Change password</Header>
                  <Form.Field>
                    <label>Current password</label>
                    <Input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      placeholder="Write your current password here..."
                      autoComplete="password"
                      value={password}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>New password</label>
                    <Input
                      type="password"
                      name="newPassword"
                      onChange={this.handleChange}
                      placeholder="Write your new password here..."
                      autoComplete="password"
                      value={newPassword}
                    />
                  </Form.Field>

                  {error && (
                    <Message error header="Ooops!" content={error.message} />
                  )}
                  {loading ? (
                    <Loader active inline />
                  ) : (
                    <Button type="submit">Save</Button>
                  )}
                </Form>
              </Container>
            )}
          </Mutation>
        )}
      </Query>
    )
  }
}

const Container = styled.div`
  padding: 50px 150px;
`

export default withUser(Profile)
