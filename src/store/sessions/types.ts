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

interface VersionUpdateAction {
  type: 'VersionUpdate'
  payload: {
    version: string
    requiredUpdate: boolean
  }
}

export type SessionActionTypes =
  | SessionCreateAction
  | SessionUpdateAction
  | VersionUpdateAction
