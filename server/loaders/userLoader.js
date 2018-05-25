import Dataloader from 'dataloader'
import User from '../db/models/User'
import _ from 'lodash'

export default new Dataloader(async objArray => {
  const userModel = objArray[0].model
  const userIds = objArray.map(obj => obj.id)
  const users = await userModel.find({ _id: { $in: userIds } }).exec()
  const userById = _.keyBy(users, '_id')
  return userIds.map(userId => userById[userId])
})
