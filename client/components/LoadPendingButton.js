import styled from 'styled-components'
import { Transition, animated } from 'react-spring'

export default styled(animated.div)`
  width: 250px;
  height: 50px;
  background: #fdd474cf;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 55px;
  border-radius: 3px;
  left: calc(50% - 125px);
  box-shadow: 0px 4px 9px 1px #0000001f;
  color: #3c3c3c;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  z-index: 99999999;
`
