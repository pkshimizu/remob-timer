import { Member } from './member'
import { Interval } from './interval'
import { randomBytes } from 'crypto'

export class Session {
  id: string
  members: Member[] = []
  interval?: Interval
  constructor(id?: string) {
    if (id) {
      this.id = id
    } else {
      this.id = Session.generateId()
    }
  }
  private static generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz234567'.split('')
    return randomBytes(16).reduce((p, i) => p + chars[i % 32], '')
  }
}
