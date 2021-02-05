interface IntervalTimerStartAction {
  type: 'IntervalTimerStart'
}

interface IntervalTimerStopAction {
  type: 'IntervalTimerStop'
}

interface IntervalTimerCountDownAction {
  type: 'IntervalTimerCountDown'
  payload: {
    msec: number
  }
}

export type IntervalStateActionTypes =
  | IntervalTimerStartAction
  | IntervalTimerStopAction
  | IntervalTimerCountDownAction
