import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { MembersActionTypes } from './types'
import firebase from 'firebase/app'

export const fetchMembers = (
  id: string,
): ThunkAction<any, RootState, any, MembersActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(`${id}`)
      .onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
        const members = doc.get('members')
        dispatch({
          type: 'MembersUpdate',
          payload: {
            members: members,
          },
        })
      })
  }
}
