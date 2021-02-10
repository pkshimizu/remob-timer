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
    const state = getState()
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .add({
        settings: state.settings,
        members: state.members.members,
        states: state.states,
      })
      .then((res: any) => {
        firestore
          .collection(`/sessions/${res.id}/interval`)
          .add({})
          .then(() => {
            dispatch({
              type: 'SessionCreate',
              payload: {
                id: res.id,
              },
            })
          })
      })
  }
}
