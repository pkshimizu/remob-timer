import { Member } from './member'

export class Session {
  id?: string
  members: Member[] = []
  interval?: string
  constructor(id: string) {
    this.id = id
  }
}
