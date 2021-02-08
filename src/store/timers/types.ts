export type TimerType = 'DECREMENTAL' | 'INCREMENTAL'

export type Status = 'RUNNING' | 'PAUSED' | 'STOPPED'

export interface State {
  status: Status
  time: number
  timerType: TimerType
}
