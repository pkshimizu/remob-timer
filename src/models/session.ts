import { Member } from './member'
import { Interval } from './interval'

export class Session {
  id?: string
  members: Member[] = []
  interval?: Interval
  constructor(id: string) {
    this.id = id
  }
}
