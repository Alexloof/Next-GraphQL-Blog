import styled from 'styled-components'

export default styled(Form)`
  &&& {
    background-color: #fdfdfd;
    border-radius: 3px;
    box-shadow: 0px 0px 0px 1px #75757533;
    padding: 40px;
    width: 550px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    & .field label,
    .header.large {
      color: #7d7d7d;
    }
  }
`
