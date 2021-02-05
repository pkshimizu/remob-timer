import { Session } from '../../models/session'
import { Interval } from '../../models/interval'

interface SessionCreateAction {
  type: 'SessionCreate'
  payload: Session
}

interface SessionIntervalUpdate {
  type: 'SessionIntervalUpdate'
  payload: {
    interval: Interval
  }
}

export type SessionActionTypes = SessionCreateAction | SessionIntervalUpdate
