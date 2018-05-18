import data from '../db/index'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function writePost(parent, args, ctx, info) {
  const userId = getUserId(context)
  return data[0]
}

module.exports = {
  writePost: writePost
}
