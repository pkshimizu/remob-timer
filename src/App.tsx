import { Container, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { createSession, fetchSession } from './store/sessions/actions'
import React, { useEffect, useMemo, useState } from 'react'
import SettingButton from './components/SettingButton'
import { useTimer } from './store/timers/hook'
import { Settings } from './models/settings'
import { fetchSettings, updateSettings } from './store/settings/actions'
import { fetchMembers } from './store/members/actions'
import { changeTimerState, fetchStates } from './store/states/actions'
import { IntervalPart, States, TimerState } from './models/states'
import MemberSettingsPage from './components/MemberSettingsPage'
import IntervalSettingsPage from './components/IntervalSettingsPage'
import PartSelectButtons from './components/PartSelectButtons'
import TimeView from './components/TimeView'
import dayjs from 'dayjs'
import Column from './components/Column'
import Row from './components/Row'
import GoogleAdsense from './components/Adsense'
import IntervalPartLabel from './components/IntervalPartLabel'
import TypistView from './components/TypistView'
import VersionChecker from './components/VersionChecker'
import VersionView from './components/VersionView'
import TimerButtons from './components/TimerButtons'

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    marginBottom: 16,
  },
  actions: {
    '& > *': {
      margin: 0,
    },
  },
  settings: {
    '& > *': {
      margin: 8,
    },
  },
})

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
  const finishAudio = useMemo(() => new Audio('/assets/final.mp3'), [])
  const coolDownAudio = useMemo(() => new Audio('/assets/cool_down.mp3'), [])
  const { time, start, pause, status, stop, reset } = useTimer({
    initialTime: settings.workTime,
    coolDownTime: settings.coolDownTime,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      finishAudio.play()
      dispatch(changeTimerState(TimerState.stopped, 0))
    },
    onCoolDownTimeOver: () => {
      if (states.intervalPart === IntervalPart.work) {
        coolDownAudio.play()
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
        dispatch(fetchSession(sessionId))
        dispatch(fetchSettings(sessionId))
        dispatch(fetchMembers(sessionId))
        dispatch(fetchStates(sessionId))
      }
    }
  }, [dispatch, path, id])
  useEffect(() => {}, [states, settings])
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
            reset(
              states.remainingTime - dayjs().diff(states.updatedAt, 'second'),
            )
            break
          case TimerState.paused:
            reset(states.remainingTime)
            break
        }
        break
      case 'RUNNING':
        switch (states.timerState) {
          case TimerState.stopped:
            finishAudio.play()
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
            reset(
              states.remainingTime - dayjs().diff(states.updatedAt, 'second'),
            )
            break
        }
    }
  }, [
    status,
    states,
    settings,
    start,
    stop,
    pause,
    reset,
    partTime,
    finishAudio,
  ])

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
      <VersionChecker />
      <Container className={classes.root}>
        <Column>
          <IntervalPartLabel />
          <TypistView />
          {states.timerState === TimerState.stopped ? (
            <PartSelectButtons />
          ) : (
            <Column className={classes.actions}>
              <TimeView value={time} max={partTime} />
              <TimerButtons status={status} time={time} />
            </Column>
          )}
          <Row className={classes.settings}>
            <SettingButton
              onClick={() => {
                setOpenMemberSettings(true)
              }}
            >
              Members
            </SettingButton>
            <SettingButton
              onClick={() => {
                setOpenIntervalSettings(true)
              }}
            >
              Settings
            </SettingButton>
          </Row>
          <VersionView />
          <GoogleAdsense />
        </Column>
      </Container>
    </>
  )
}

export default App
