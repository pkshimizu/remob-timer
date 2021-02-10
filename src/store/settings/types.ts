import { Settings } from '../../models/settings'

interface SettingsUpdateAction {
  type: 'SettingsUpdate'
  payload: {
    settings: Settings
  }
}

export type SettingsActionTypes = SettingsUpdateAction
