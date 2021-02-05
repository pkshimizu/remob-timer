import { Box, Button, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { IntervalState, TimerState } from './models/interval_state'
import { createSession, fetchSession } from './store/sessions/actions'
import { useCallback, useEffect } from 'react'
import { startInterval, stopInterval } from './store/interval_states/actions'

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

const timerButtonLabel = (intervalState: IntervalState): string => {
  if (intervalState.timerState === TimerState.starting) {
    return 'Stop'
  }
  if (intervalState.timerState === TimerState.stopped) {
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
        dispatch(fetchSession(path.substr(1)))
      }
    }
  }, [dispatch, path, id])
  const handleTimerButton = useCallback(() => {
    if (intervalState.timerState === TimerState.starting) {
      dispatch(stopInterval())
    }
    if (intervalState.timerState === TimerState.stopped) {
      dispatch(startInterval())
    }
  }, [dispatch, intervalState])

  const classes = useStyles()
  const typist = intervalState.typist
  const remainingTime = intervalState.remainingTime
  return (
    <Container className={classes.root}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <div className={classes.status}>1st Interval</div>
        <Box display={'flex'} alignItems={'center'}>
          <KeyboardOutlined className={classes.typistIcon} />
          <div className={classes.typist}>{typist}</div>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <div className={classes.remainingTime}>
            {Math.floor(remainingTime / 60)} min {remainingTime % 60} sec
          </div>
        </Box>
        <Box display={'flex'} alignItems={'center'} className={classes.actions}>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleTimerButton}
          >
            {timerButtonLabel(intervalState)}
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
