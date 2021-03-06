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
  typist: string | null
  remainingTime: number
  updatedAt: string
}
