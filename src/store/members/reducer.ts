import { MembersActionTypes } from './types'
import { Member } from '../../models/member'

interface MembersStore {
  members: Member[]
}

const initState: MembersStore = {
  members: [],
}

const sort = (members: Member[]) => {
  members.sort((member1, member2) => {
    return member1.order - member2.order
  })
  return members
}

const membersReducer = (state = initState, action: MembersActionTypes) => {
  switch (action.type) {
    case 'MemberAdd':
      return {
        ...state,
        members: sort(state.members.concat(action.payload.member)),
      }
    case 'MemberUpdate':
      return {
        ...state,
        members: sort(
          state.members.map((member) => {
            if (member.id === action.payload.member.id) {
              return action.payload.member
            }
            return member
          }),
        ),
      }
    case 'MemberDelete':
      return {
        ...state,
        members: sort(
          state.members.filter((member) => {
            return member.id !== action.payload.id
          }),
        ),
      }
  }
  return state
}

export default membersReducer
