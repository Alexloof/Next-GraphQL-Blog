import Dataloader from 'dataloader'
import _ from 'lodash'

export default () =>
  new Dataloader(async objArray => {
    const model = objArray[0].model
    const field = objArray[0].field

    const ids = objArray.map(obj => obj.data)

    let query = {}
    query[field] = { $in: ids }
    const result = await model.find(query).exec()

    const resultById = _.keyBy(result, '_id')
    const svar = ids.map(id => resultById[id])
    return svar
  })
