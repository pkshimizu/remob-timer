import { SessionActionTypes } from './types'

interface SessionStore {
  id?: string
}

const initState: SessionStore = {
  id: undefined,
}

const sessionReducer = (state = initState, action: SessionActionTypes) => {
  switch (action.type) {
    case 'SessionCreate':
      return {
        id: action.payload.id,
      }
  }
  return state
}

export default sessionReducer
