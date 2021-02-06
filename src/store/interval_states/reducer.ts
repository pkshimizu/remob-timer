import { IntervalState, IntervalType } from '../../models/interval_state'
import { IntervalStateActionTypes } from './types'

const initState: IntervalState = {
  remainingTime: 15,
  type: IntervalType.waiting_for_mobbing,
  typist: 'typist name',
}

const intervalStateReducer = (
  state = initState,
  action: IntervalStateActionTypes,
) => {
  switch (action.type) {
    case 'IntervalTypeNext':
      return {
        ...state,
        type: action.payload.type,
        remainingTime: action.payload.remainingTime,
      }
    case 'IntervalTypeChange':
      return {
        ...state,
        type: action.payload.type,
      }
  }
  return state
}

export default intervalStateReducer
