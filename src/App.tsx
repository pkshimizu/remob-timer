import { Box, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { createSession } from './store/sessions/actions'
import { useCallback, useEffect } from 'react'
import BreakPage from './components/BreakPage'
import ActionButton from './components/ActionButton'
import SettingButton from './components/SettingButton'
import { useTimer } from './store/timers/hook'
import { Status } from './store/timers/types'
import { Settings } from './models/settings'
import { fetchSettings } from './store/settings/actions'
import { fetchMembers } from './store/members/actions'
import {
  changeTimerState,
  fetchStates,
  startShortBreak,
  startWork,
} from './store/states/actions'
import { IntervalPart, States, TimerState } from './models/states'

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

const intervalPartLabel = (type: IntervalPart): string => {
  if (type === IntervalPart.work) {
    return 'Work'
  }
  if (type === IntervalPart.shortBreak || type === IntervalPart.longBreak) {
    return 'Break'
  }
  return 'Unknown'
}

function App() {
  const id = useSelector<RootState, string | undefined>(
    (state) => state.session.id,
  )
  const settings = useSelector<RootState, Settings>((state) => state.settings)
  const states = useSelector<RootState, States>((state) => state.states)
  const { time, start, pause, status, reset } = useTimer({
    initialTime: settings.workTime,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      if (states.intervalPart === IntervalPart.work) {
        dispatch(startShortBreak())
      }
      if (
        states.intervalPart === IntervalPart.shortBreak ||
        states.intervalPart === IntervalPart.longBreak
      ) {
        dispatch(startWork())
      }
    },
  })
  const path = window.location.pathname
  const dispatch = useDispatch()
  useEffect(() => {
    if (path === '/') {
      if (id) {
        window.location.pathname = `/${id}`
      } else {
        dispatch(createSession())
      }
    } else {
      if (!id) {
        const sessionId = path.substr(1)
        dispatch(fetchSettings(sessionId))
        dispatch(fetchMembers(sessionId))
        dispatch(fetchStates(sessionId))
      }
    }
  }, [dispatch, path, id])
  useEffect(() => {
    if (status === 'STOPPED') {
      const audio = new Audio('/assets/finish.mp3')
      audio.play()
      dispatch(changeTimerState(TimerState.stopped))
    }
    if (status === 'RUNNING') {
      dispatch(changeTimerState(TimerState.running))
    }
    if (status === 'PAUSED') {
      dispatch(changeTimerState(TimerState.paused))
    }
  }, [status, dispatch])
  useEffect(() => {
    if (states.intervalPart === IntervalPart.work) {
      reset(settings.workTime)
    }
  }, [reset, settings, states])
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
  const typist = states.typist
  return (
    <>
      <BreakPage onStart={handleStartBreak} />
      <Container className={classes.root}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <div className={classes.status}>
            {intervalPartLabel(states.intervalPart)}
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
