import { States } from '../../models/states'

interface StatesUpdateAction {
  type: 'StatesUpdate'
  payload: {
    states: States
  }
}
export type StatesActionTypes = StatesUpdateAction
