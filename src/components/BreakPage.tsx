import { Box, Container, Dialog, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { IntervalType } from '../models/interval_state'
import { useCallback } from 'react'
import { skipBreak, startBreak } from '../store/interval_states/actions'
import ActionButton from './ActionButton'
import { Interval } from '../models/interval'

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
  const intervalType = useSelector<RootState, IntervalType>(
    (state) => state.intervalState.type,
  )
  const interval = useSelector<RootState, Interval>(
    (state) => state.session.interval,
  )
  const dispatch = useDispatch()
  const onSelectShortBreak = useCallback(() => {
    dispatch(startBreak())
    onStart(interval.shortBreakTime)
  }, [dispatch, interval, onStart])
  const onSelectLongBreak = useCallback(() => {
    dispatch(startBreak())
    onStart(interval.longBreakTime)
  }, [dispatch, interval, onStart])
  const onSelectSkipBreak = useCallback(() => {
    dispatch(skipBreak())
  }, [dispatch])
  return (
    <Dialog open={intervalType === IntervalType.waiting_for_break} fullScreen>
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          className={classes.actions}
        >
          <ActionButton onClick={onSelectShortBreak}>Short Break</ActionButton>
          <ActionButton onClick={onSelectLongBreak}>Long Break</ActionButton>
          <ActionButton onClick={onSelectSkipBreak}>Skip</ActionButton>
        </Box>
      </Container>
    </Dialog>
  )
}

export default BreakPage
