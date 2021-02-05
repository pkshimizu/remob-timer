import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import sessionReducer from './sessions/reducer'
import intervalStateReducer from './interval_states/reducer'
import thunk from 'redux-thunk'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import firebase from '../config/firebase'
import { createLogger } from 'redux-logger'

const reducers = combineReducers({
  session: sessionReducer,
  intervalState: intervalStateReducer,
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
