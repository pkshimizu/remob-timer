export enum TypistSelectType {
  rotation,
  random,
}

export interface Settings {
  workTime: number
  coolDownTime: number
  shortBreakTime: number
  longBreakTime: number
  typistSelectionType: TypistSelectType
}
