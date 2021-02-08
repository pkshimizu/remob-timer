import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from '../sessions/types'
import { IntervalType } from '../../models/interval_state'

const findNextType = (type: IntervalType): IntervalType => {
  if (type === IntervalType.waiting_for_mobbing) {
    return IntervalType.mobbing
  }
  if (type === IntervalType.mobbing) {
    return IntervalType.waiting_for_break
  }
  if (type === IntervalType.waiting_for_break) {
    return IntervalType.break
  }
  if (type === IntervalType.break) {
    return IntervalType.waiting_for_mobbing
  }
  return type
}

export const nextInterval = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return async (dispatch: Dispatch, getState) => {
    const state = getState()
    const nextType = findNextType(state.intervalState.type)
    await dispatch({
      type: 'IntervalTypeChange',
      payload: {
        type: nextType,
      },
    })
  }
}

export const startMobbing = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return async (dispatch: Dispatch) => {
    await dispatch({
      type: 'IntervalTypeChange',
      payload: {
        type: IntervalType.mobbing,
      },
    })
  }
}

export const startBreak = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return async (dispatch: Dispatch) => {
    await dispatch({
      type: 'IntervalTypeChange',
      payload: {
        type: IntervalType.break,
      },
    })
  }
}
