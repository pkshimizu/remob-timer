export enum IntervalType {
  mobbing,
  break,
}

export class IntervalState {
  type?: IntervalType
  remainingTime: number = 0
  typist?: string
}
