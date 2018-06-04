import Dataloader from 'dataloader'
import _ from 'lodash'

export default () =>
  new Dataloader(async queries => {
    return Promise.all(queries.map(async query => await query()))
  })
