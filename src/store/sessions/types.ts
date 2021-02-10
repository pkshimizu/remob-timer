interface SessionCreateAction {
  type: 'SessionCreate'
  payload: {
    id: string
  }
}

interface SessionUpdateAction {
  type: 'SessionUpdate'
  payload: {
    id: string
  }
}

export type SessionActionTypes = SessionCreateAction | SessionUpdateAction
