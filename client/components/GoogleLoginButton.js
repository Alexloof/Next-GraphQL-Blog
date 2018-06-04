import styled from 'styled-components'

const dev = process.env.NODE_ENV !== 'production'

export default ({ text }) => (
  <GoogleLoginButton
    href={
      dev
        ? `${process.env.API_URL_DEV}/auth/google`
        : `${process.env.API_URL_PROD}/auth/google`
    }
  >
    {text}
  </GoogleLoginButton>
)

const GoogleLoginButton = styled.a`
  background: #dd4b39;
  color: white;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 60%;
  margin: 0 auto;
  border-radius: 3px;
  margin-top: 15px;
  letter-spacing: 1px;
  font-weight: bold;
`
