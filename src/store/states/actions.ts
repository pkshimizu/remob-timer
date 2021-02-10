import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { StatesActionTypes } from './types'
import firebase from 'firebase/app'
import { IntervalPart, States, TimerState } from '../../models/states'

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

export const startWork = (): ThunkAction<
  any,
  RootState,
  any,
  StatesActionTypes
> => {
  return (dispatch) => {
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.work,
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
  return (dispatch) => {
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.shortBreak,
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
  return (dispatch) => {
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.longBreak,
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
  return (dispatch) => {
    dispatch({
      type: 'IntervalPartUpdate',
      payload: {
        intervalPart: IntervalPart.work,
      },
    })
  }
}

export const changeTimerState = (
  timerState: TimerState,
): ThunkAction<any, RootState, any, StatesActionTypes> => {
  return (dispatch) => {
    dispatch({
      type: 'TimerStateUpdate',
      payload: {
        timerState: timerState,
      },
    })
  }
}
