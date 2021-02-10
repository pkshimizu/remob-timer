import { SettingsActionTypes } from './types'
import { Settings } from '../../models/settings'

const initState: Settings = {
  workTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
}

const settingsReducer = (state = initState, action: SettingsActionTypes) => {
  switch (action.type) {
    case 'SettingsUpdate':
      return action.payload.settings
  }
  return state
}

export default settingsReducer
