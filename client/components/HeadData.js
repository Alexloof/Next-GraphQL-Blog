import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription =
  'A Blog including a server and a client. Server is built with Node, Express & a customized GraphQL-yoga server. Client is built with React, Next js & Apollo client. '
const defaultOGURL = 'https://next-graphql-client.now.sh/'
const defaultOGImage = ''
const defaultTitle = 'Next GraphQL Blog'

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
