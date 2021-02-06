import { Box, Button, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { IntervalState, IntervalType } from './models/interval_state'
import { createSession, fetchSession } from './store/sessions/actions'
import { useCallback, useEffect, useRef } from 'react'
import { startBreak, startMobbing } from './store/interval_states/actions'
import { useTimer } from 'use-timer'
import { Status } from 'use-timer/lib/types'

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
  timerButton: {
    fontSize: 32,
    width: 256,
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
    if (
      intervalType === IntervalType.waiting_for_mobbing ||
      intervalType === IntervalType.waiting_for_break
    ) {
      audioRef.current?.play()
    }
  }, [intervalType])
  const handleTimerButton = useCallback(() => {
    if (status === 'RUNNING') {
      pause()
    }
    if (status === 'PAUSED' || status === 'STOPPED') {
      start()
    }
    if (status === 'STOPPED') {
      if (intervalType === IntervalType.waiting_for_mobbing) {
        dispatch(startMobbing())
      }
      if (intervalType === IntervalType.waiting_for_break) {
        dispatch(startBreak())
      }
    }
  }, [dispatch, status, start, pause, intervalType])

  const classes = useStyles()
  const typist = intervalState.typist
  return (
    <Container className={classes.root}>
      <audio src={'./assets/finish.mp3'} ref={audioRef} />
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <div className={classes.status}>1st Interval</div>
        <Box display={'flex'} alignItems={'center'}>
          <KeyboardOutlined className={classes.typistIcon} />
          <div className={classes.typist}>{typist}</div>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <div className={classes.remainingTime}>
            {Math.floor(time / 60)} min {time % 60} sec
          </div>
        </Box>
        <Box display={'flex'} alignItems={'center'} className={classes.actions}>
          <Button
            variant={'contained'}
            color={'primary'}
            className={classes.timerButton}
            onClick={handleTimerButton}
          >
            {timerButtonLabel(status)}
          </Button>
        </Box>
        <Box display={'flex'} alignItems={'center'} className={classes.actions}>
          <Button variant={'outlined'} color={'primary'}>
            Member Settings
          </Button>
          <Button variant={'outlined'} color={'primary'}>
            Interval Settings
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default App
