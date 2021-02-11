import {
  Box,
  Container,
  Dialog,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useCallback } from 'react'
import ActionButton from './ActionButton'
import { IntervalPart, TimerState } from '../models/states'
import { Settings } from '../models/settings'
import {
  skipBreak,
  startLongBreak,
  startShortBreak,
} from '../store/states/actions'

const useStyles = makeStyles({
  actions: {
    '& > *': {
      margin: 8,
    },
  },
})

export interface BreakPageProps {
  onStart: (time: number) => void
}

function BreakPage({ onStart }: BreakPageProps) {
  const classes = useStyles()
  const intervalPart = useSelector<RootState, IntervalPart>(
    (state) => state.states.intervalPart,
  )
  const timerState = useSelector<RootState, TimerState>(
    (state) => state.states.timerState,
  )
  const settings = useSelector<RootState, Settings>((state) => state.settings)
  const dispatch = useDispatch()
  const onSelectShortBreak = useCallback(() => {
    dispatch(startShortBreak())
    onStart(settings.shortBreakTime)
  }, [dispatch, settings, onStart])
  const onSelectLongBreak = useCallback(() => {
    dispatch(startLongBreak())
    onStart(settings.longBreakTime)
  }, [dispatch, settings, onStart])
  const onSelectSkipBreak = useCallback(() => {
    dispatch(skipBreak())
  }, [dispatch])
  return (
    <Dialog
      open={
        (intervalPart === IntervalPart.shortBreak ||
          intervalPart === IntervalPart.longBreak) &&
        timerState === TimerState.stopped
      }
      fullScreen
    >
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          className={classes.actions}
        >
          <Typography variant={'h4'}>Break Select</Typography>
          <ActionButton onClick={onSelectShortBreak}>Short Break</ActionButton>
          <ActionButton onClick={onSelectLongBreak}>Long Break</ActionButton>
          <ActionButton onClick={onSelectSkipBreak}>Skip</ActionButton>
        </Box>
      </Container>
    </Dialog>
  )
}

export default BreakPage
