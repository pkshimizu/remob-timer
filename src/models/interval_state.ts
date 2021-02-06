export enum IntervalType {
  waiting_for_mobbing,
  mobbing,
  waiting_for_break,
  break,
}

export class IntervalState {
  type: IntervalType = IntervalType.waiting_for_mobbing
  remainingTime: number = 0
  typist?: string
}
