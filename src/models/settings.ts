export enum TypistSelectType {
  rotation,
  random,
}

export interface Settings {
  workTime: number
  workPreTime: number
  shortBreakTime: number
  longBreakTime: number
  typistSelectionType: TypistSelectType
}
