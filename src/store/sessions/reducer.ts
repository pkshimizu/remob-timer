import { SessionActionTypes } from './types'
import { Session } from '../../models/session'
import { Interval } from '../../models/interval'

const initState: Session = {
  id: undefined,
  members: [],
  interval: new Interval(),
}

const sessionReducer = (state = initState, action: SessionActionTypes) => {
  switch (action.type) {
    case 'SessionCreate':
      return action.payload.session
    case 'SessionIntervalUpdate':
      return {
        ...state,
        interval: action.payload.interval,
      }
  }
  return state
}

export default sessionReducer
