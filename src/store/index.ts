import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import sessionReducer from './sessions/reducer'
import thunk from 'redux-thunk'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import firebase from '../config/firebase'
import { createLogger } from 'redux-logger'
import settingsReducer from './settings/reducer'
import membersReducer from './members/reducer'
import statesReducer from './states/reducer'

const reducers = combineReducers({
  session: sessionReducer,
  settings: settingsReducer,
  members: membersReducer,
  states: statesReducer,
})

export type RootState = ReturnType<typeof reducers>

const logger = createLogger({
  diff: true,
  collapsed: true,
})

const middlewares = []
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

middlewares.push(thunk.withExtraArgument({ getFirebase, getFirestore }))

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {}),
  ),
)

export default store
