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
    case 'MembersUpdate':
      return {
        ...state,
        members: action.payload.members,
      }
  }
  return state
}

export default membersReducer
