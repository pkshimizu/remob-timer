import { useCallback, useEffect, useReducer } from 'react'
import { Status, TimerType } from './types'
import reducer from './reducer'

export type Config = {
  autostart: boolean
  endTime: number | null
  initialTime: number
  interval: number
  onTimeOver?: () => void
  onTimeUpdate?: (time: number) => void
  step: number
  timerType: TimerType
}

export type ReturnValue = {
  pause: () => void
  reset: (time?: number) => void
  start: () => void
  status: Status
  time: number
}

export const useTimer = ({
  autostart = false,
  endTime,
  initialTime = 0,
  interval = 1000,
  onTimeOver,
  onTimeUpdate,
  step = 1,
  timerType = 'INCREMENTAL',
}: Partial<Config> = {}): ReturnValue => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    time: initialTime,
    timerType,
  })

  const { status, time } = state

  const pause = useCallback(() => {
    dispatch({ type: 'pause' })
  }, [])

  const reset = useCallback(
    (time?: number) => {
      initialTime = time || initialTime
      dispatch({ type: 'set', payload: { newTime: initialTime } })
    },
    [initialTime],
  )

  const start = useCallback(() => {
    dispatch({ type: 'start', payload: { initialTime } })
  }, [initialTime])

  useEffect(() => {
    if (autostart) {
      dispatch({ type: 'start', payload: { initialTime } })
    }
  }, [autostart, initialTime])

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time)
    }
  }, [time, onTimeUpdate])

  useEffect(() => {
    if (status !== 'STOPPED' && time === endTime) {
      dispatch({ type: 'stop' })

      if (typeof onTimeOver === 'function') {
        onTimeOver()
      }
    }
  }, [endTime, onTimeOver, time, status])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (status === 'RUNNING') {
      intervalId = setInterval(() => {
        dispatch({
          type: 'set',
          payload: {
            newTime: timerType === 'DECREMENTAL' ? time - step : time + step,
          },
        })
      }, interval)
    } else if (intervalId) {
      clearInterval(intervalId)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [status, step, timerType, interval, time])

  return { pause, reset, start, status, time }
}
