import Dataloader from 'dataloader'
import _ from 'lodash'

export default () =>
  new Dataloader(async objArray => {
    const model = objArray[0].model
    const ids = objArray.map(obj => obj.id)
    const result = await model.find({ _id: { $in: ids } }).exec()
    const resultById = _.keyBy(result, '_id')
    const svar = ids.map(id => resultById[id])
    return svar
  })
