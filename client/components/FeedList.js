import React, { Component } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'

import PostCard from './PostCard'

class FeedList extends Component {
  componentDidMount() {
    this.props.subscribeToNewLikes()
    this.props.subscribeToNewComments()
    this.props.subscribeToNewPosts()
  }

  render() {
    return (
      <Container>
        <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.props.fetchMore}
          hasMore={this.props.hasMorePosts}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {this.props.posts.map(post => <PostCard key={post._id} {...post} />)}
        </InfiniteScroll>
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
