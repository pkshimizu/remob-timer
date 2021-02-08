import { TimerActionsType } from './actions'
import { State } from './types'

function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {
    case 'pause': {
      return {
        ...state,
        status: 'PAUSED',
      }
    }
    case 'reset': {
      return {
        ...state,
        status: 'STOPPED',
        time: action.payload.initialTime,
      }
    }
    case 'set': {
      return {
        ...state,
        time: action.payload.newTime,
      }
    }
    case 'start': {
      const { initialTime } = action.payload

      return {
        ...state,
        status: 'RUNNING',
        time: state.status === 'STOPPED' ? initialTime : state.time,
      }
    }
    case 'stop': {
      return {
        ...state,
        status: 'STOPPED',
      }
    }
    default:
      return state
  }
}

export default reducer
