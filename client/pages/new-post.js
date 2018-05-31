import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import {
  Button,
  Form,
  Input,
  TextArea,
  Header,
  Loader,
  Message
} from 'semantic-ui-react'

import { WRITE_POST, writePostOptions } from '../api/mutations/post/writePost'

class NewPost extends Component {
  state = {
    name: '',
    content: '',
    image: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (e, writePost) => {
    e.preventDefault()

    try {
      const { data } = await writePost(writePostOptions())

      Router.push('/')
    } catch (error) {
      this.setState({
        name: '',
        content: '',
        image: ''
      })
    }
  }

  render() {
    const { name, content } = this.state
    return (
      <Mutation mutation={WRITE_POST} variables={{ name, content }}>
        {(writePost, { loading, error, data }) => (
          <Container>
            <Form
              error={!!error}
              onSubmit={e => this.handleSubmit(e, writePost)}
            >
              <Header size="large">Write a new post</Header>
              <Form.Field>
                <label>Name</label>
                <Input
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Give your post a name..."
                  autoComplete="name"
                  value={this.state.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Image</label>
                <Input
                  name="image"
                  type="file"
                  onChange={this.handleChange}
                  autoComplete="image"
                  //value={this.state.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Content</label>
                <TextArea
                  rows="16"
                  name="content"
                  onChange={this.handleChange}
                  placeholder="Write something nice..."
                  autoComplete="content"
                  value={this.state.content}
                />
              </Form.Field>
              {error && (
                <Message error header="Ooops!" content={error.message} />
              )}
              {loading ? (
                <Loader active inline />
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </Form>
          </Container>
        )}
      </Mutation>
    )
  }
}

const Container = styled.div`
  padding: 50px 150px;
`

export default NewPost
