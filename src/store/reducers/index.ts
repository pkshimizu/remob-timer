import { combineReducers } from 'redux'
import sessionReducer from './session_reducer'
import intervalStateReducer from './interval_state_reducer'

const reducers = combineReducers({
  session: sessionReducer,
  intervalState: intervalStateReducer,
})

export type RootState = ReturnType<typeof reducers>

export default reducers
