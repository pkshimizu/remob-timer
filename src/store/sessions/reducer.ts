import { Session } from '../../models/session'

const initState: Session = {
  id: '',
  members: [],
  interval: {
    time: 0,
    shortBreakTime: 0,
  },
}
const sessionReducer = (state = initState /*, action */) => {
  return state
}

export default sessionReducer
