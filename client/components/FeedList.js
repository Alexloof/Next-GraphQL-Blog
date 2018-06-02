import React, { Component } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import FlipMove from 'react-flip-move'

import PostCard from './PostCard'

class FeedList extends Component {
  componentDidMount() {
    this.props.subscribeToNewLikes()
    this.props.subscribeToNewComments()
    this.props.subscribeToNewPosts()
  }

  render() {
    const { posts, fetchMore, hasMorePosts } = this.props
    return (
      <Container>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMore}
          hasMore={hasMorePosts}
          style={{ overflow: 'hidden' }}
        >
          <FlipMove
            duration={500}
            easing="ease-in-out"
            appearAnimation="fade"
            enterAnimation="accordionHorizontal"
            leaveAnimation="accordionHorizontal"
            typeName="ul"
            style={{
              position: 'relative',
              padding: 0
            }}
          >
            {!!posts.length ? (
              posts.map((post, index) => (
                <li key={post._id} style={{ display: 'inline-block' }}>
                  <PostCard key={post._id} index={index} {...post} />
                </li>
              ))
            ) : (
              <div>No Posts here... :(</div>
            )}
          </FlipMove>
        </InfiniteScroll>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 40px;
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
