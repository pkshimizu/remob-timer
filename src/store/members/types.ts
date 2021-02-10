import { Member } from '../../models/member'

interface MembersUpdateAction {
  type: 'MembersUpdate'
  payload: {
    members: Member[]
  }
}

export type MembersActionTypes = MembersUpdateAction
