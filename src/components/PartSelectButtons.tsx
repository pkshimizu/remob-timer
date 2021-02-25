import { makeStyles } from '@material-ui/core'
import ActionButton from './ActionButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  startLongBreak,
  startShortBreak,
  startWork,
} from '../store/states/actions'
import { DirectionsRun, FreeBreakfast, Wc } from '@material-ui/icons'
import Row from './Row'

const useStyles = makeStyles({
  actions: {
    '& > *': {
      margin: 8,
    },
  },
  button: {
    fontSize: 32,
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
    <Row className={classes.actions}>
      <ActionButton
        icon={<DirectionsRun />}
        text={'work'}
        onClick={handleStartWork}
      />
      <ActionButton
        icon={<Wc />}
        text={'short break'}
        onClick={handleStartShortBreak}
      />
      <ActionButton
        icon={<FreeBreakfast />}
        text={'long break'}
        onClick={handleStartLongBreak}
      />
    </Row>
  )
}

export default PartSelectButtons
