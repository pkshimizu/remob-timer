export function createActionType<T extends string>(type: T): { type: T }

export function createActionType<T extends string, P extends unknown>(
  type: T,
  payload: P,
): { type: T; payload: P }

export function createActionType(type: string, payload?: unknown) {
  return { type, payload }
}

const PAUSE = () => createActionType('pause')

const RESET = (initialTime: number) =>
  createActionType('reset', { initialTime })

const SET = (newTime: number) => createActionType('set', { newTime })

const START = (initialTime: number) =>
  createActionType('start', { initialTime })

const STOP = () => createActionType('stop')

export type TimerActionsType = ReturnType<
  typeof PAUSE | typeof RESET | typeof SET | typeof START | typeof STOP
>
