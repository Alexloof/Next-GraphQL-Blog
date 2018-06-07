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

import privatePage from '../lib/privatePage'

import { WRITE_POST, writePostOptions } from '../api/mutations/post/writePost'

class NewPost extends Component {
  state = {
    name: '',
    content: '',
    imageFile: '',
    imagePrev: '',
    imageURL: '',
    loading: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDrop = files => {
    this.setState({ imagePrev: files[0].preview, imageFile: files[0] })
  }

  handleSubmit = (e, writePost) => {
    e.preventDefault()
    this.setState({ loading: true })

    const formData = new FormData()
    formData.append('file', this.state.imageFile)
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET) // Replace the preset name with your own
    formData.append('api_key', process.env.CLOUDINARY_KEY) // Replace API key with your own Cloudinary key
    formData.append('timestamp', (Date.now() / 1000) | 0)

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${
          process.env.CLOUDINARY_NAME
        }/image/upload`,
        formData,
        {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }
      )
      .then(response => {
        const data = response.data
        this.setState({ imageURL: data.secure_url }, async () => {
          try {
            const { data } = await writePost(writePostOptions())

            Router.push('/')
          } catch (error) {
            console.log(error)
            this.setState({
              name: '',
              content: '',
              imageFile: '',
              imagePrev: '',
              imageURL: '',
              loading: false
            })
          }
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          name: '',
          content: '',
          imageFile: '',
          imagePrev: '',
          imageURL: '',
          loading: false
        })
      })
  }

  render() {
    const { name, content, imageURL, imagePrev } = this.state

    return (
      <Mutation
        mutation={WRITE_POST}
        variables={{ name, content, image: imageURL }}
      >
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
                <Dropzone
                  style={dropzoneStyles}
                  onDrop={this.handleDrop}
                  accept="image/*"
                >
                  Upload cover image
                </Dropzone>
                {imagePrev && <StyledImage src={imagePrev} />}
              </Form.Field>
              <Form.Field>
                <label>Content</label>
                <TextArea
                  rows="14"
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
              {this.state.loading || loading ? (
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
  padding: 5% 10%;
`

const StyledImage = styled.img`
  width: 300px;
  height: 250px;
  margin: 30px 0px 10px 0px;
  object-fit: cover;
`

const dropzoneStyles = {
  height: '55px',
  background: '#ffb710',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#4a4a4a',
  fontWeight: 'bold',
  fontSize: '15px',
  width: '180px',
  borderRadius: '3px',
  cursor: 'pointer'
}

export default privatePage(NewPost)
