import quires from './queries'
import mutations from './mutations'
import subscriptions from './subscriptions'

export default {
  ...quires,
  ...mutations,
  ...subscriptions
}
