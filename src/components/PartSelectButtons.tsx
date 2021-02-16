import { Box, makeStyles } from '@material-ui/core'
import ActionButton from './ActionButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  startLongBreak,
  startShortBreak,
  startWork,
} from '../store/states/actions'

const useStyles = makeStyles({
  actions: {
    '& > *': {
      margin: 8,
    },
  },
})

function PartSelectButtons() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleStartWork = useCallback(() => {
    dispatch(startWork())
  }, [dispatch])
  const handleStartShortBreak = useCallback(() => {
    dispatch(startShortBreak())
  }, [dispatch])
  const handleStartLongBreak = useCallback(() => {
    dispatch(startLongBreak())
  }, [dispatch])
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      className={classes.actions}
    >
      <ActionButton onClick={handleStartWork}>Work</ActionButton>
      <ActionButton onClick={handleStartShortBreak}>Short Break</ActionButton>
      <ActionButton onClick={handleStartLongBreak}>Long Break</ActionButton>
    </Box>
  )
}

export default PartSelectButtons
