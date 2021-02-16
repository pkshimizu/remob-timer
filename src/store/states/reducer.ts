import { StatesActionTypes } from './types'
import { IntervalPart, States, TimerState } from '../../models/states'

const initState: States = {
  intervalPart: IntervalPart.work,
  timerState: TimerState.stopped,
  time: 0,
  typist: null,
}

const statesReducer = (state = initState, action: StatesActionTypes) => {
  switch (action.type) {
    case 'StatesUpdate':
      return action.payload.states
  }
  return state
}

export default statesReducer
