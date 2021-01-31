import { IntervalState } from '../../models/interval_state'

const initState: IntervalState = {
  remainingTime: 615,
  type: undefined,
  typist: 'typist name',
}

const intervalStateReducer = (state = initState /*, action */) => {
  return state
}

export default intervalStateReducer
