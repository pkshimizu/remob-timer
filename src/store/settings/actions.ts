import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SettingsActionTypes } from './types'
import firebase from 'firebase/app'
import { Settings } from '../../models/settings'

export const fetchSettings = (
  id: string,
): ThunkAction<any, RootState, any, SettingsActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(`${id}`)
      .onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
        const settings = doc.get('settings')
        if (settings) {
          dispatch({
            type: 'SettingsUpdate',
            payload: {
              settings: settings,
            },
          })
        }
      })
  }
}

export const updateSettings = (
  settings: Settings,
): ThunkAction<any, RootState, any, SettingsActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const sessionId = getState().session.id
    const firestore = getFirestore()
    firestore.collection('sessions').doc(sessionId).update({
      settings: settings,
    })
  }
}
