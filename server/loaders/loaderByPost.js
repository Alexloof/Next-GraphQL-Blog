import Dataloader from 'dataloader'
import _ from 'lodash'

export default () =>
  new Dataloader(async objArray => {
    const model = objArray[0].model
    const postIds = objArray.map(obj => obj.post)

    const result = await model.find({ post: { $in: postIds } }).exec()

    const resultById = _.keyBy(result, '_id')

    const arrayObject = postIds.map(postId => {
      let array = []

      for (let key in resultById) {
        let obj = resultById[key]
        if (JSON.stringify(obj.post) == JSON.stringify(postId)) {
          array.push(obj)
        }
      }
      return array
    })

    return arrayObject
  })
