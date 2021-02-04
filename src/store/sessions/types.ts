import { Session } from '../../models/session'

interface SessionCreateAction {
  type: 'SessionCreate'
  payload: Session
}

export type SessionActionTypes = SessionCreateAction
