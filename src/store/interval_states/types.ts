import { IntervalType } from '../../models/interval_state'

interface IntervalTypeNextAction {
  type: 'IntervalTypeNext'
  payload: {
    type: IntervalType
    remainingTime: number
  }
}

interface IntervalTimerCountDownAction {
  type: 'IntervalTimerCountDown'
  payload: {
    msec: number
  }
}

interface IntervalTypeChangeAction {
  type: 'IntervalTypeChange'
  payload: {
    type: IntervalType
  }
}

export type IntervalStateActionTypes =
  | IntervalTypeNextAction
  | IntervalTimerCountDownAction
  | IntervalTypeChangeAction
