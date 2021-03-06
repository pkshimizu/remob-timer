import { SettingsActionTypes } from './types'
import { Settings, TypistSelectType } from '../../models/settings'

const initState: Settings = {
  workTime: 25 * 60,
  coolDownTime: 5 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
  typistSelectionType: TypistSelectType.rotation,
  adsense: true,
  silent: false,
}

const settingsReducer = (state = initState, action: SettingsActionTypes) => {
  switch (action.type) {
    case 'SettingsUpdate':
      return {
        ...initState,
        ...action.payload.settings,
      }
  }
  return state
}

export default settingsReducer
