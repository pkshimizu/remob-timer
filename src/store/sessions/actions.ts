import { Dispatch } from 'redux'

export const createSession = () => {
  return (dispatch: Dispatch /*, getState, { getFirebase, getFirestore}*/) => {
    dispatch({
      type: 'CreateSession',
    })
  }
}
