export enum IntervalPart {
  work,
  shortBreak,
  longBreak,
}

export enum TimerState {
  stopped,
  running,
  paused,
}

export interface States {
  intervalPart: IntervalPart
  timerState: TimerState
  time: number
  typist: string | null
}
