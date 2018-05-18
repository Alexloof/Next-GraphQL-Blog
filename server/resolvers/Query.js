import users from '../db/index'

function users(parent, args, ctx, info) {
  return users
}

module.exports = {
  users: users
}
