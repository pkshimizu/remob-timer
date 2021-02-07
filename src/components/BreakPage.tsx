import { Box, Container, Dialog, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { IntervalType } from '../models/interval_state'
import { useCallback } from 'react'
import { startBreak } from '../store/interval_states/actions'
import ActionButton from './ActionButton'

const useStyles = makeStyles({
  actions: {
    '& > *': {
      margin: 8,
    },
  },
})

function BreakPage() {
  const classes = useStyles()
  const intervalType = useSelector<RootState, IntervalType>(
    (state) => state.intervalState.type,
  )
  const dispatch = useDispatch()
  const onSelectShortBreak = useCallback(() => {
    dispatch(startBreak())
  }, [dispatch])
  const onSelectLongBreak = useCallback(() => {
    dispatch(startBreak())
  }, [dispatch])
  const onSelectSkipBreak = useCallback(() => {}, [dispatch])
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