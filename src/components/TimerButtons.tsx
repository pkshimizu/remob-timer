import Row from './Row'
import ActionButton from './ActionButton'
import { Error, Pause, PlayArrow, SkipNext } from '@material-ui/icons'
import React, { ReactNode, useCallback } from 'react'
import { makeStyles } from '@material-ui/core'
import { Status } from '../store/timers/types'
import { changeTimerState } from '../store/states/actions'
import { TimerState } from '../models/states'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  root: {
    '& > *': {
      margin: 8,
    },
  },
})

const timerButtonIcon = (status: Status): ReactNode => {
  if (status === 'RUNNING') {
    return <Pause />
  }
  if (status === 'STOPPED' || status === 'PAUSED') {
    return <PlayArrow />
  }
  return <Error />
}

export interface TimerButtonsProps {
  status: Status
  time: number
}

function TimerButtons({ status, time }: TimerButtonsProps) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleTimerButton = useCallback(() => {
    if (status === 'RUNNING') {
      dispatch(changeTimerState(TimerState.paused, time))
    }
    if (status === 'PAUSED' || status === 'STOPPED') {
      dispatch(changeTimerState(TimerState.running, time))
    }
  }, [status, time, dispatch])
  const handleNextButton = useCallback(() => {
    dispatch(changeTimerState(TimerState.stopped, 0))
  }, [dispatch])

  return (
    <Row className={classes.root}>
      <ActionButton
        icon={timerButtonIcon(status)}
        circle
        onClick={handleTimerButton}
      />
      <ActionButton icon={<SkipNext />} circle onClick={handleNextButton} />
    </Row>
  )
}

export default TimerButtons
