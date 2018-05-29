import Link from 'next/link'
import Nav from '../components/nav'
import React, { Component } from 'react'

import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="hero">
          <StyledHeader>Welcome to Nextssss!</StyledHeader>
          <Button content="Primary" primary />
        </div>
      </div>
    )
  }
}

export default Home

const StyledHeader = styled.h1`
  font-size: 50px;
  color: green;
`
