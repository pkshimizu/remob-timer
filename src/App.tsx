import { Box, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { IntervalState, IntervalType } from './models/interval_state'
import { createSession, fetchSession } from './store/sessions/actions'
import { useCallback, useEffect, useRef } from 'react'
import { nextInterval } from './store/interval_states/actions'
import { useTimer } from 'use-timer'
import { Status } from 'use-timer/lib/types'
import BreakPage from './components/BreakPage'
import ActionButton from './components/ActionButton'
import SettingButton from './components/SettingButton'

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
  const intervalState = useSelector<RootState, IntervalState>(
    (state) => state.intervalState,
  )
  const intervalType = useSelector<RootState, IntervalType>(
    (state) => state.intervalState.type,
  )
  const { time, start, pause, status } = useTimer({
    initialTime: intervalState.remainingTime,
    step: -1,
    endTime: 0,
  })
  const path = window.location.pathname
  const dispatch = useDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (path === '/') {
      if (id) {
        window.location.pathname = `/${id}`
      } else {
        dispatch(createSession())
      }
    } else {
      if (!id) {
        dispatch(fetchSession(path.substr(1)))
      }
    }
  }, [dispatch, path, id])
  useEffect(() => {
    if (status === 'STOPPED') {
      audioRef.current?.play()
      dispatch(nextInterval())
    }
  }, [dispatch, status])
  const handleTimerButton = useCallback(() => {
    if (status === 'RUNNING') {
      pause()
    }
    if (status === 'PAUSED' || status === 'STOPPED') {
      start()
    }
  }, [status, start, pause])

  const classes = useStyles()
  const typist = intervalState.typist
  return (
    <>
      <BreakPage />
      <audio src={'/assets/finish.mp3'} ref={audioRef} />
      <Container className={classes.root}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <div className={classes.status}>
            {intervalTypeLabel(intervalType)}
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
