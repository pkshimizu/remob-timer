import { Box, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { createSession, fetchSession } from './store/sessions/actions'
import { useCallback, useEffect, useState } from 'react'
import ActionButton from './components/ActionButton'
import SettingButton from './components/SettingButton'
import { useTimer } from './store/timers/hook'
import { Status } from './store/timers/types'
import { Settings } from './models/settings'
import { fetchSettings, updateSettings } from './store/settings/actions'
import { fetchMembers } from './store/members/actions'
import { changeTimerState, fetchStates } from './store/states/actions'
import { IntervalPart, States, TimerState } from './models/states'
import MemberSettingsPage from './components/MemberSettingsPage'
import IntervalSettingsPage from './components/IntervalSettingsPage'
import PartSelectButtons from './components/PartSelectButtons'
import TimeView from './components/TimeView'

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
  switch (type) {
    case IntervalPart.work:
      return 'Work'
    case IntervalPart.shortBreak:
    case IntervalPart.longBreak:
      return 'Break'
  }
  return 'Unknown'
}

const intervalPartTime = (intervalPart: IntervalPart, settings: Settings) => {
  switch (intervalPart) {
    case IntervalPart.work:
      return settings.workTime
    case IntervalPart.shortBreak:
      return settings.shortBreakTime
    case IntervalPart.longBreak:
      return settings.longBreakTime
  }
  return 0
}

function App() {
  const [openMemberSettings, setOpenMemberSettings] = useState<boolean>(false)
  const [openIntervalSettings, setOpenIntervalSettings] = useState<boolean>(
    false,
  )
  const id = useSelector<RootState, string | undefined>(
    (state) => state.session.id,
  )
  const settings = useSelector<RootState, Settings>((state) => state.settings)
  const states = useSelector<RootState, States>((state) => state.states)
  const typist = useSelector<RootState, string | null>((state) => {
    const id = state.states.typist
    return (
      state.members.members.find((member) => member.id === id)?.name || null
    )
  })
  const { time, start, pause, status, stop, reset } = useTimer({
    initialTime: settings.workTime,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      const audio = new Audio('/assets/finish.mp3')
      audio.play()
      dispatch(changeTimerState(TimerState.stopped))
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
        dispatch(fetchSession(sessionId))
        dispatch(fetchSettings(sessionId))
        dispatch(fetchMembers(sessionId))
        dispatch(fetchStates(sessionId))
      }
    }
  }, [dispatch, path, id])
  useEffect(() => {
    if (states.timerState === TimerState.stopped) {
      switch (states.intervalPart) {
        case IntervalPart.work:
          reset(settings.workTime)
          break
        case IntervalPart.shortBreak:
          reset(settings.shortBreakTime)
          break
        case IntervalPart.longBreak:
          reset(settings.longBreakTime)
          break
      }
    }
  }, [settings, states, reset])
  const partTime = intervalPartTime(states.intervalPart, settings)
  useEffect(() => {
    switch (status) {
      case 'STOPPED':
        switch (states.timerState) {
          case TimerState.running:
            start(partTime)
            break
        }
        break
      case 'RUNNING':
        switch (states.timerState) {
          case TimerState.stopped:
            stop()
            break
          case TimerState.paused:
            pause()
            break
        }
        break
      case 'PAUSED':
        switch (states.timerState) {
          case TimerState.stopped:
            stop()
            break
          case TimerState.running:
            start(partTime)
            break
        }
    }
  }, [status, states, settings, start, stop, pause])
  const handleTimerButton = useCallback(() => {
    if (status === 'RUNNING') {
      dispatch(changeTimerState(TimerState.paused))
    }
    if (status === 'PAUSED' || status === 'STOPPED') {
      dispatch(changeTimerState(TimerState.running))
    }
  }, [status, dispatch])

  const classes = useStyles()
  return (
    <>
      <MemberSettingsPage
        open={openMemberSettings}
        onClose={() => setOpenMemberSettings(false)}
      />
      <IntervalSettingsPage
        open={openIntervalSettings}
        settings={settings}
        onSave={(settings) => dispatch(updateSettings(settings))}
        onClose={() => setOpenIntervalSettings(false)}
      />
      <Container className={classes.root}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <div className={classes.status}>
            {intervalPartLabel(states.intervalPart)}
          </div>
          <Box display={'flex'} alignItems={'center'}>
            <KeyboardOutlined className={classes.typistIcon} />
            <div className={classes.typist}>{typist}</div>
          </Box>
          {states.timerState === TimerState.stopped ? (
            <PartSelectButtons />
          ) : (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              className={classes.actions}
            >
              <Box display={'flex'} alignItems={'center'}>
                <TimeView value={time} max={partTime} />
              </Box>
              <ActionButton onClick={handleTimerButton}>
                {timerButtonLabel(status)}
              </ActionButton>
            </Box>
          )}
          <Box
            display={'flex'}
            alignItems={'center'}
            className={classes.actions}
          >
            <SettingButton
              onClick={() => {
                setOpenMemberSettings(true)
              }}
            >
              Member Settings
            </SettingButton>
            <SettingButton
              onClick={() => {
                setOpenIntervalSettings(true)
              }}
            >
              Interval Settings
            </SettingButton>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default App
