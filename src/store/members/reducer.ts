import { MembersActionTypes } from './types'
import { Member } from '../../models/member'

interface MembersStore {
  members: Member[]
}

const initState: MembersStore = {
  members: [],
}

const membersReducer = (state = initState, action: MembersActionTypes) => {
  switch (action.type) {
    case 'MemberAdd':
      return {
        ...state,
        members: state.members.concat(action.payload.member),
      }
    case 'MemberUpdate':
      return {
        ...state,
        members: state.members.map((member) => {
          if (member.id === action.payload.member.id) {
            return action.payload.member
          }
          return member
        }),
      }
    case 'MemberDelete':
      return {
        ...state,
        members: state.members.filter((member) => {
          return member.id !== action.payload.id
        }),
      }
  }
  return state
}

export default membersReducer
