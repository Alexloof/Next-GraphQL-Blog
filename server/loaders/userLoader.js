import Dataloader from 'dataloader'
import User from '../db/models/User'
import _ from 'lodash'

export default new Dataloader(async userIds => {
  const users = await User.find({ _id: { $in: userIds } }).exec()
  const userById = _.keyBy(users, '_id')
  return userIds.map(userId => userById[userId])
})
