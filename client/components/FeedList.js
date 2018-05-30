import React, { Component } from 'react'
import styled from 'styled-components'

import PostCard from './PostCard'

class FeedList extends Component {
  componentDidMount() {
    this.props.subscribeToNewLikes()
  }

  render() {
    return (
      <Container>
        {this.props.posts.map(post => <PostCard key={post._id} {...post} />)}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  .ui.card {
    margin: 15px;
    width: 310px;
  }
  .ui.card:first-child {
    margin-top: 15px;
  }
  .ui.card:last-child {
    margin-bottom: 15px;
  }
`
export default FeedList
