import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import sessionReducer from './sessions/reducer'
import intervalStateReducer from './interval_states/reducer'
import thunk from 'redux-thunk'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import firebase from '../config/firebase'

const reducers = combineReducers({
  session: sessionReducer,
  intervalState: intervalStateReducer,
})

export type RootState = ReturnType<typeof reducers>

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {}),
  ),
)

export default store
