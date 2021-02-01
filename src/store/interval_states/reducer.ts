import { IntervalState } from '../../models/interval_state'
import { IntervalStateActionTypes } from './types'

const initState: IntervalState = {
  remainingTime: 615,
  type: undefined,
  typist: 'typist name',
}

const intervalStateReducer = (
  state = initState,
  action: IntervalStateActionTypes,
) => {
  switch (action.type) {
    case 'IntervalStart':
      state.remainingTime = state.remainingTime - 1
  }
  return state
}

export default intervalStateReducer
