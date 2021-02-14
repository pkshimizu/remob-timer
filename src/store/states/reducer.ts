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
      console.log(
        `part: ${state.intervalPart} -> ${action.payload.states.intervalPart}`,
      )
      console.log(
        `time: ${state.timerState} -> ${action.payload.states.timerState}`,
      )
      return action.payload.states
  }
  return state
}

export default statesReducer
