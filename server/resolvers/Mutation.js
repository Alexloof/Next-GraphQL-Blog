import data from '../db/index'

function writePost(parent, args, ctx, info) {
  return data[0]
}

module.exports = {
  writePost: writePost
}
