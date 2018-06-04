export default error =>
  JSON.stringify(error['graphQLErrors'][0]['message']).slice(8, -1)
