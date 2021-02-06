import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from '../sessions/types'
import { IntervalType } from '../../models/interval_state'
import { Interval } from '../../models/interval'

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

const remainingTime = (type: IntervalType, interval: Interval): number => {
  if (
    type === IntervalType.waiting_for_mobbing ||
    type === IntervalType.mobbing
  ) {
    return interval.time
  }
  if (type === IntervalType.waiting_for_break || type === IntervalType.break) {
    return interval.shortBreakTime
  }
  return interval.time
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
      type: 'IntervalTypeNextStart',
      payload: {
        type: nextType,
        remainingTime: remainingTime(nextType, state.session.interval!),
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
  return async (dispatch: Dispatch /*, getState*/) => {
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
  return async (dispatch: Dispatch /*, getState*/) => {
    await dispatch({
      type: 'IntervalTypeChange',
      payload: {
        type: IntervalType.break,
      },
    })
  }
}
