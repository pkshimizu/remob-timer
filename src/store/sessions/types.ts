interface SessionCreateAction {
  type: 'SessionCreate'
  payload: {
    id: string
  }
}

export type SessionActionTypes = SessionCreateAction
