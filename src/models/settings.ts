export enum TypistSelectType {
  rotation,
  random,
}

export interface Settings {
  workTime: number
  shortBreakTime: number
  longBreakTime: number
  typistSelectionType: TypistSelectType
}
