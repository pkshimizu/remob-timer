import { StatesActionTypes } from './types'
import { IntervalPart, States, TimerState } from '../../models/states'
import dayjs from 'dayjs'

const initState: States = {
  intervalPart: IntervalPart.work,
  timerState: TimerState.stopped,
  intervalPartUpdatedAt: dayjs().format(),
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
