import { Member } from '../../models/member'

interface MemberAddAction {
  type: 'MemberAdd'
  payload: {
    member: Member
  }
}

interface MemberUpdateAction {
  type: 'MemberUpdate'
  payload: {
    member: Member
  }
}

interface MemberDeleteAction {
  type: 'MemberDelete'
  payload: {
    id: string
  }
}

export type MembersActionTypes =
  | MemberAddAction
  | MemberUpdateAction
  | MemberDeleteAction
