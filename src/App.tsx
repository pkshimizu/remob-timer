import { Box, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { IntervalState, IntervalType } from './models/interval_state'
import { createSession, fetchSession } from './store/sessions/actions'
import { useCallback, useEffect } from 'react'
import { nextInterval } from './store/interval_states/actions'
import { Status } from 'use-timer/lib/types'
import BreakPage from './components/BreakPage'
import ActionButton from './components/ActionButton'
import SettingButton from './components/SettingButton'
import { Interval } from './models/interval'
import { useTimer } from './store/timers/hook'

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    marginBottom: 16,
  },
  status: {
    fontSize: 32,
  },
  typistIcon: {
    fontSize: 32,
  },
  typist: {
    fontSize: 32,
  },
  remainingTime: {
    marginTop: 32,
    fontSize: 64,
  },
  actions: {
    '& > *': {
      margin: 8,
    },
  },
})

const timerButtonLabel = (status: Status): string => {
  if (status === 'RUNNING') {
    return 'Stop'
  }
  if (status === 'STOPPED' || status === 'PAUSED') {
    return 'Start'
  }
  return 'Unknown'
}

const intervalTypeLabel = (type: IntervalType): string => {
  if (type === IntervalType.waiting_for_mobbing) {
    return 'Waitting for mobbing'
  }
  if (type === IntervalType.mobbing) {
    return 'Mobbing'
  }
  if (type === IntervalType.waiting_for_break) {
    return 'Waitting for break'
  }
  if (type === IntervalType.break) {
    return 'Break'
  }
  return 'Unknown'
}

function App() {
  const id = useSelector<RootState, string | undefined>(
    (state) => state.session.id,
  )
  const interval = useSelector<RootState, Interval>(
    (state) => state.session.interval,
  )
  const intervalState = useSelector<RootState, IntervalState>(
    (state) => state.intervalState,
  )
  const { time, start, pause, status, reset } = useTimer({
    initialTime: interval.time,
    endTime: 0,
    timerType: 'DECREMENTAL',
  })
  const path = window.location.pathname
  const dispatch = useDispatch()
  useEffect(() => {
    if (path === '/') {
      if (id) {
        window.location.pathname = `/${id}`
      } else {
        dispatch(createSession(new Interval()))
      }
    } else {
      if (!id) {
        dispatch(fetchSession(path.substr(1)))
      }
    }
  }, [dispatch, path, id])
  useEffect(() => {
    if (status === 'STOPPED') {
      const audio = new Audio('/assets/finish.mp3')
      audio.play()
      dispatch(nextInterval())
    }
  }, [dispatch, status])
  useEffect(() => {
    if (
      intervalState.type === IntervalType.waiting_for_mobbing ||
      intervalState.type === IntervalType.mobbing
    ) {
      reset(interval.time)
    }
  }, [reset, interval, intervalState])
  const handleTimerButton = useCallback(() => {
    if (status === 'RUNNING') {
      pause()
    }
    if (status === 'PAUSED' || status === 'STOPPED') {
      start()
    }
  }, [status, start, pause])
  const handleStartBreak = useCallback(
    (time: number) => {
      reset(time)
      start()
    },
    [start, reset],
  )

  const classes = useStyles()
  const typist = intervalState.typist
  return (
    <>
      <BreakPage onStart={handleStartBreak} />
      <Container className={classes.root}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <div className={classes.status}>
            {intervalTypeLabel(intervalState.type)}
          </div>
          <Box display={'flex'} alignItems={'center'}>
            <KeyboardOutlined className={classes.typistIcon} />
            <div className={classes.typist}>{typist}</div>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <div className={classes.remainingTime}>
              {Math.floor(time / 60)} min {time % 60} sec
            </div>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            className={classes.actions}
          >
            <ActionButton onClick={handleTimerButton}>
              {timerButtonLabel(status)}
            </ActionButton>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            className={classes.actions}
          >
            <SettingButton onClick={() => {}}>Member Settings</SettingButton>
            <SettingButton onClick={() => {}}>Interval Settings</SettingButton>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default App
