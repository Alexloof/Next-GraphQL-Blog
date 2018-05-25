import Dataloader from 'dataloader'
import _ from 'lodash'

export default () =>
  new Dataloader(async objArray => {
    //console.log(objArray)
    const model = objArray[0].model
    const field = objArray[0].field

    const ids = objArray.map(obj => obj.data)

    let query = {}
    query[field] = { $in: ids }
    const result = await model.find(query).exec()

    const resultById = _.keyBy(result, '_id')

    const arrayObject = ids.map(id => {
      let array = []

      for (let key in resultById) {
        let obj = resultById[key]

        if (JSON.stringify(obj[field]) == JSON.stringify(id)) {
          array.push(obj)
        }
      }
      return array
    })

    return arrayObject
  })
