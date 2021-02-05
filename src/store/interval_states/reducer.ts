import { IntervalState, TimerState } from '../../models/interval_state'
import { IntervalStateActionTypes } from './types'

const initState: IntervalState = {
  remainingTime: 615,
  type: undefined,
  timerState: TimerState.stopped,
  typist: 'typist name',
}

const intervalStateReducer = (
  state = initState,
  action: IntervalStateActionTypes,
) => {
  switch (action.type) {
    case 'IntervalTimerStart':
      return {
        ...state,
        timerState: TimerState.starting,
      }
    case 'IntervalTimerStop':
      return {
        ...state,
        timerState: TimerState.stopped,
      }
    case 'IntervalTimerCountDown':
      return {
        ...state,
        remainingTime: state.remainingTime - action.payload.msec / 1000,
      }
  }
  return state
}

export default intervalStateReducer
