export enum IntervalType {
  waiting_for_mobbing,
  mobbing,
  waiting_for_break,
  break,
}

export class IntervalState {
  type: IntervalType = IntervalType.waiting_for_mobbing
  typist?: string
}
