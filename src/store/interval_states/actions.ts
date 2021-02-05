import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from '../sessions/types'
import { TimerState } from '../../models/interval_state'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

export const startInterval = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return async (dispatch: Dispatch, getState) => {
    await dispatch({
      type: 'IntervalTimerStart',
    })
    while (getState().intervalState.timerState === TimerState.starting) {
      dispatch({
        type: 'IntervalTimerCountDown',
        payload: {
          msec: 1000,
        },
      })
      await sleep(1000)
    }
  }
}
export const stopInterval = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return async (dispatch: Dispatch /*, getState*/) => {
    await dispatch({
      type: 'IntervalTimerStop',
    })
  }
}
