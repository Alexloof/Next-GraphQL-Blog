import data from '../db/index'

function posts(parent, args, ctx, info) {
  console.log(data)
  return data
}

module.exports = {
  posts
}
