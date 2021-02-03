import { Session } from '../../models/session'
import { SessionActionTypes } from './types'

const initState: Session = {
  id: '',
  members: [],
  interval: {
    time: 0,
    shortBreakTime: 0,
  },
}

const sessionReducer = (state = initState, action: SessionActionTypes) => {
  switch (action.type) {
    case 'SessionCreate':
      return { ...state, id: action.payload.id }
  }
  return state
}

export default sessionReducer
