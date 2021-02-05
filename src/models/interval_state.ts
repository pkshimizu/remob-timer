export enum IntervalType {
  mobbing,
  break,
}

export enum TimerState {
  starting,
  stopped,
}

export class IntervalState {
  type?: IntervalType
  remainingTime: number = 0
  timerState: TimerState = TimerState.stopped
  typist?: string
}
