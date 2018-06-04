import styled from 'styled-components'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default () => (
  <StyledSegment>
    <Loader inverted active size="large" />
  </StyledSegment>
)

const StyledSegment = styled(Segment)`
  &&& {
    position: fixed;
    bottom: 30px;
    right: 30px;
    box-shadow: none;
    border: 0;
    .ui.inverted.loader:before {
      border-color: rgb(255, 209, 152);
    }
  }
`
