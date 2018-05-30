import Link from 'next/link'
import Nav from '../components/nav'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

class Home extends Component {
  render() {
    return (
      <Query query={ALL_POSTS}>
        {({ loading, error, data: { allPosts } }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`

          return (
            <FeedList>
              {allPosts.posts.map(post => (
                <PostCard key={post._id} {...post} />
              ))}
            </FeedList>
          )
        }}
      </Query>
    )
  }
}

const ALL_POSTS = gql`
  query allPosts {
    allPosts {
      count
      posts {
        _id
        createdAt
        name
        content
        postedBy {
          name
        }
        likes {
          _id
        }
        comments {
          _id
        }
      }
    }
  }
`

export default Home

const FeedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  .ui.card {
    margin: 15px;
  }
  .ui.card:first-child {
    margin-top: 15px;
  }
  .ui.card:last-child {
    margin-bottom: 15px;
  }
`
