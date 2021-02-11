import { IntervalPart, States, TimerState } from '../../models/states'

interface StatesUpdateAction {
  type: 'StatesUpdate'
  payload: {
    states: States
  }
}

interface IntervalPartUpdateAction {
  type: 'IntervalPartUpdate'
  payload: {
    intervalPart: IntervalPart
    typist: string
  }
}

interface TimerStateUpdateAction {
  type: 'TimerStateUpdate'
  payload: {
    timerState: TimerState
  }
}

export type StatesActionTypes =
  | StatesUpdateAction
  | IntervalPartUpdateAction
  | TimerStateUpdateAction
