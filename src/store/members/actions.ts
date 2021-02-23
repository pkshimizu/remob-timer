import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { MembersActionTypes } from './types'
import firebase from 'firebase/app'
import { Member, MemberRole } from '../../models/member'

export const fetchMembers = (
  id: string,
): ThunkAction<any, RootState, any, MembersActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(`${id}`)
      .collection('members')
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<Member>) => {
        snapshot.docChanges().forEach(({ doc, type }) => {
          switch (type) {
            case 'added':
              dispatch({
                type: 'MemberAdd',
                payload: {
                  member: {
                    id: doc.id,
                    name: doc.data().name,
                    role: doc.data().role,
                    order: doc.data().order,
                  },
                },
              })
              return
            case 'modified':
              dispatch({
                type: 'MemberUpdate',
                payload: {
                  member: {
                    id: doc.id,
                    name: doc.data().name,
                    role: doc.data().role,
                    order: doc.data().order,
                  },
                },
              })
              return
            case 'removed':
              dispatch({
                type: 'MemberDelete',
                payload: {
                  id: doc.id,
                },
              })
              return
          }
        })
      })
  }
}
export const addMember = (
  name: string,
  role: MemberRole,
): ThunkAction<any, RootState, any, MembersActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const sessionId = getState().session.id
    const order = getState().members.members.length
    const firestore = getFirestore()
    firestore.collection('sessions').doc(sessionId).collection('members').add({
      name: name,
      role: role,
      order: order,
    })
  }
}

export const updateMember = (
  id: string,
  name: string,
  role: MemberRole,
  order: number,
): ThunkAction<any, RootState, any, MembersActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const sessionId = getState().session.id
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(sessionId)
      .collection('members')
      .doc(id)
      .update({
        name: name,
        role: role,
        order: order,
      })
  }
}
export const deleteMember = (
  id: string,
): ThunkAction<any, RootState, any, MembersActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const sessionId = getState().session.id
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(sessionId)
      .collection('members')
      .doc(id)
      .delete()
  }
}
