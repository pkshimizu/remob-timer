import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { SessionActionTypes } from './types'
import { Session } from '../../models/session'
import firebase from 'firebase/app'
import { Interval } from '../../models/interval'

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
          payload: {
            session: new Session(res.id),
          },
        })
      })
  }
}

export const fetchSession = (
  id: string,
): ThunkAction<any, RootState, any, SessionActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(`${id}`)
      .collection('interval')
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<Interval>) => {
        snapshot.docChanges().forEach(({ doc, type }) => {
          const data = doc.data()
          switch (type) {
            case 'modified':
              dispatch({
                type: 'SessionIntervalUpdate',
                payload: {
                  interval: {
                    time: data.time,
                    shortBreakTime: data.shortBreakTime,
                    longBreakTime: data.longBreakTime,
                  },
                },
              })
              return
          }
        })
      })
  }
}
