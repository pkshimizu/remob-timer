import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { StatesActionTypes } from './types'
import firebase from 'firebase/app'
import { IntervalPart, States, TimerState } from '../../models/states'
import { Member, MemberRole } from '../../models/member'
import { Settings, TypistSelectType } from '../../models/settings'

export const fetchStates = (
  id: string,
): ThunkAction<any, RootState, any, StatesActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('sessions')
      .doc(`${id}`)
      .onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
        const states = doc.get('states') as States
        if (states) {
          dispatch({
            type: 'StatesUpdate',
            payload: {
              states: states,
            },
          })
        }
      })
  }
}

const selectTypist = (
  members: Member[],
  settings: Settings,
  states: States,
): string => {
  const navigators = members.filter(
    (member) => member.role === MemberRole.Navigator,
  )
  console.log(navigators)
  if (navigators.length === 0) {
    return ''
  }
  if (settings.typistSelectionType === TypistSelectType.rotation) {
    let prev = ''
    for (let navigator of navigators) {
      console.log(
        `prev: ${prev}, navigator: ${navigator.id}, typist: ${states.typist}`,
      )
      if (prev === states.typist) {
        return navigator.id
      }
      prev = navigator.id
    }
  }
  if (settings.typistSelectionType === TypistSelectType.random) {
    return navigators[Math.floor(Math.random() * Math.floor(navigators.length))]
      .id
  }
  return navigators[0].id
}

export const startWork = (): ThunkAction<
  any,
  RootState,
  any,
  StatesActionTypes
> => {
  return (dispatch, getState) => {
    const members = getState().members.members
    const settings = getState().settings
    const states = getState().states
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.work,
        typist: selectTypist(members, settings, states),
      },
    })
  }
}

export const startShortBreak = (): ThunkAction<
  any,
  RootState,
  any,
  StatesActionTypes
> => {
  return (dispatch, getState) => {
    const typist = getState().states.typist || ''
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.shortBreak,
        typist: typist,
      },
    })
  }
}

export const startLongBreak = (): ThunkAction<
  any,
  RootState,
  any,
  StatesActionTypes
> => {
  return (dispatch, getState) => {
    const typist = getState().states.typist || ''
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.longBreak,
        typist: typist,
      },
    })
  }
}

export const skipBreak = (): ThunkAction<
  any,
  RootState,
  any,
  StatesActionTypes
> => {
  return (dispatch, getState) => {
    const members = getState().members.members
    const settings = getState().settings
    const states = getState().states
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.work,
        typist: selectTypist(members, settings, states),
      },
    })
  }
}

export const changeTimerState = (
  timerState: TimerState,
): ThunkAction<any, RootState, any, StatesActionTypes> => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const id = getState().session.id
    const states = getState().states
    if (id) {
      firestore
        .collection('sessions')
        .doc(id)
        .update({
          states: {
            ...states,
            timerState: timerState,
          },
        })
      dispatch({
        type: 'TimerStateUpdate',
        payload: {
          timerState: timerState,
        },
      })
    }
  }
}
