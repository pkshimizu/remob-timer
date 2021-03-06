import { useCallback, useEffect, useReducer, useState } from 'react'
import { Status, TimerType } from './types'
import reducer from './reducer'

export type Config = {
  autostart: boolean
  endTime: number | null
  initialTime: number
  coolDownTime: number
  interval: number
  onTimeOver?: () => void
  onCoolDownTimeOver?: () => void
  onTimeUpdate?: (time: number) => void
  step: number
  timerType: TimerType
}

export type ReturnValue = {
  pause: () => void
  reset: (time?: number) => void
  start: (time: number) => void
  stop: () => void
  status: Status
  time: number
}

export const useTimer = ({
  autostart = false,
  endTime,
  initialTime = 0,
  coolDownTime = 0,
  interval = 1000,
  onTimeOver,
  onCoolDownTimeOver,
  onTimeUpdate,
  step = 1,
  timerType = 'INCREMENTAL',
}: Partial<Config> = {}): ReturnValue => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    time: initialTime,
    timerType,
  })
  const [initTime, setInitTime] = useState(initialTime)
  const [calledCoolDownTimeOver, setCalledCoolDownTimeOver] = useState(false)

  const { status, time } = state

  const pause = useCallback(() => {
    dispatch({ type: 'pause' })
  }, [])

  const reset = useCallback(
    (time?: number) => {
      setInitTime(time || initTime)
      dispatch({ type: 'set', payload: { newTime: time || initTime } })
    },
    [dispatch, initTime, setInitTime],
  )

  const start = useCallback((time: number) => {
    dispatch({ type: 'start', payload: { initialTime: time } })
  }, [])

  const stop = useCallback(() => {
    dispatch({ type: 'stop' })
    setCalledCoolDownTimeOver(false)
  }, [])

  useEffect(() => {
    if (autostart) {
      dispatch({ type: 'start', payload: { initialTime: initTime } })
    }
  }, [autostart, initTime])

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time)
    }
  }, [time, onTimeUpdate])

  useEffect(() => {
    if (status !== 'STOPPED' && time === endTime) {
      dispatch({ type: 'stop' })
      setCalledCoolDownTimeOver(false)

      if (typeof onTimeOver === 'function') {
        onTimeOver()
      }
    }
  }, [endTime, onTimeOver, time, status])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (status === 'RUNNING') {
      intervalId = setInterval(() => {
        const newTime = timerType === 'DECREMENTAL' ? time - step : time + step
        const callCoolDownTimeOver =
          timerType === 'DECREMENTAL'
            ? newTime <= coolDownTime
            : newTime >= coolDownTime
        if (callCoolDownTimeOver && !calledCoolDownTimeOver) {
          if (typeof onCoolDownTimeOver === 'function') {
            onCoolDownTimeOver()
          }
          setCalledCoolDownTimeOver(true)
        }
        dispatch({
          type: 'set',
          payload: {
            newTime: newTime,
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
  }, [
    status,
    step,
    timerType,
    interval,
    time,
    coolDownTime,
    calledCoolDownTimeOver,
    onCoolDownTimeOver,
  ])

  return { pause, reset, start, stop, status, time }
}
