import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import axios from 'axios'
import Dropzone from 'react-dropzone'
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

  handleDrop = files => {
    // Push all the axios request promise into a single array
    console.log(files[0])
    // Initial FormData
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'fulksj5x') // Replace the preset name with your own
    formData.append('api_key', '399346686547332') // Replace API key with your own Cloudinary key
    formData.append('timestamp', (Date.now() / 1000) | 0)

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    axios
      .post('https://api.cloudinary.com/v1_1/alexloof/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(response => {
        const data = response.data
        const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log(data)
      })
  }

  handleSubmit = async (e, writePost) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('file', this.state.file)
      formData.append('upload_preset', 'fulksj5x') // Replace the preset name with your own
      formData.append('api_key', '399346686547332') // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0)

      axios
        .post('https://api.cloudinary.com/v1_1/alexloof/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(result => console.log(result))
        .catch(e => console.log(e))

      // const { data } = await writePost(writePostOptions())

      // Router.push('/')
    } catch (error) {
      console.log(error)
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
                <Dropzone onDrop={this.handleDrop} accept="image/*">
                  <p>Drop your files or click here to upload</p>
                </Dropzone>
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
