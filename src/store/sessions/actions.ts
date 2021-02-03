import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from './types'

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
        console.log(res)
        dispatch({
          type: 'SessionCreate',
          payload: {
            id: res.id,
          },
        })
      })
  }
}
