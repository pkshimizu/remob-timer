import { Dispatch } from 'redux'

export const startInterval = () => {
  return (dispatch: Dispatch /*, getState */) => {
    dispatch({
      type: 'IntervalStart',
    })
  }
}
