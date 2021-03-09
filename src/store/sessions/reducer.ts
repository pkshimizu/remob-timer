import { SessionActionTypes } from './types'

interface SessionStore {
  id?: string
  version?: string
  requiredUpdate: boolean
}

const initState: SessionStore = {
  id: undefined,
  version: undefined,
  requiredUpdate: false,
}

const sessionReducer = (state = initState, action: SessionActionTypes) => {
  switch (action.type) {
    case 'SessionCreate':
      return {
        ...state,
        id: action.payload.id,
      }
    case 'SessionUpdate':
      return {
        ...state,
        id: action.payload.id,
      }
    case 'VersionUpdate':
      return {
        ...state,
        version: action.payload.version,
        requiredUpdate: action.payload.requiredUpdate,
      }
  }
  return state
}

export default sessionReducer
