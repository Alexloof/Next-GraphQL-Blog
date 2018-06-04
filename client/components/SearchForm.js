import React, { Component } from 'react'
import { Input, Form, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import ALL_POSTS from '../api/queries/post/allPosts'
import { POSTS_LIMIT } from '../api/constants'

class SearchForm extends Component {
  state = {
    searchTerm: ''
  }

  searchPosts = async e => {
    e.preventDefault()
    const { data } = await this.props.client.query({
      query: ALL_POSTS,
      variables: {
        filter: this.state.searchTerm,
        sort: '-createdAt',
        limit: POSTS_LIMIT,
        offset: 0
      }
    })

    const cacheData = this.props.client.readQuery({
      query: ALL_POSTS,
      variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' }
    })

    this.props.client.writeQuery({
      query: ALL_POSTS,
      variables: { offset: 0, limit: POSTS_LIMIT, sort: '-createdAt' },
      data: {
        allPosts: {
          __typename: 'PostFeed',
          count: cacheData.allPosts.count,
          posts: [...data.allPosts.posts]
        }
      }
    })
  }

  render() {
    return (
      <Form onSubmit={this.searchPosts}>
        <StyledInput size="large" icon placeholder="Search...">
          <input
            onChange={e => this.setState({ searchTerm: e.target.value })}
            value={this.state.searchTerm}
          />
          {!!this.state.searchTerm.length ? (
            <StyledIcon
              name="remove"
              onClick={() => this.setState({ searchTerm: '' })}
            />
          ) : (
            <StyledIcon name="search" onClick={this.searchPosts} />
          )}
        </StyledInput>
      </Form>
    )
  }
}

const StyledInput = styled(Input)`
  &&& {
    display: flex;
    justify-content: center;
    width: 400px;
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
    max-width: 100%;
  }
`

const StyledIcon = styled(Icon)`
  &&& {
    pointer-events: auto !important;
    cursor: pointer !important;
  }
`

export default SearchForm
