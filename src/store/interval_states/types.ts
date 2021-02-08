import { IntervalType } from '../../models/interval_state'

interface IntervalTypeChangeAction {
  type: 'IntervalTypeChange'
  payload: {
    type: IntervalType
  }
}

export type IntervalStateActionTypes = IntervalTypeChangeAction
