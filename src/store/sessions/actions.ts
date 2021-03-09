import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from './types'
import { AxiosResponse } from 'axios'

export const createSession = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState()
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .add({
        settings: state.settings,
        states: state.states,
      })
      .then((res: any) => {
        dispatch({
          type: 'SessionCreate',
          payload: {
            id: res.id,
          },
        })
      })
  }
}
export const fetchSession = (
  id: string,
): ThunkAction<void, RootState, any, SessionActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(id)
      .onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
        dispatch({
          type: 'SessionUpdate',
          payload: {
            id: doc.id,
          },
        })
      })
  }
}

export const fetchVersion = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return (dispatch, getState, { axios }) => {
    axios.get('/version.json').then((res: AxiosResponse) => {
      const state = getState()
      const version = res.data.version
      const current = state.session.version
      dispatch({
        type: 'VersionUpdate',
        payload: {
          version: version,
          requiredUpdate: current !== undefined && current !== version,
        },
      })
    })
  }
}
