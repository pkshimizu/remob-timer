import { StatesActionTypes } from './types'
import { IntervalPart, States, TimerState } from '../../models/states'

const initState: States = {
  intervalPart: IntervalPart.work,
  timerState: TimerState.stopped,
  typist: null,
}

const statesReducer = (state = initState, action: StatesActionTypes) => {
  switch (action.type) {
    case 'StatesUpdate':
      return action.payload.states
    case 'IntervalPartUpdate':
      return {
        ...state,
        intervalPart: action.payload.intervalPart,
      }
    case 'TimerStateUpdate':
      return {
        ...state,
        timerState: action.payload.timerState,
      }
  }
  return state
}

export default statesReducer
