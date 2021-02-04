import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from './types'
import { Session } from '../../models/session'

export const createSession = (): ThunkAction<
  void,
  RootState,
  any,
  SessionActionTypes
> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .add({})
      .then((res: any) => {
        dispatch({
          type: 'SessionCreate',
          payload: new Session(res.id),
        })
      })
  }
}
