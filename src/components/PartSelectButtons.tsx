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
import Column from './Column'

const useStyles = makeStyles({
  actions: {
    '& > *': {
      marginTop: 0,
    },
  },
  breakButtons: {
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
    <Column className={classes.actions}>
      <ActionButton
        icon={<DirectionsRun fontSize={'large'} />}
        text={'work'}
        size={'large'}
        circle
        onClick={handleStartWork}
      />
      <Row className={classes.breakButtons}>
        <ActionButton
          icon={<Wc />}
          text={'short break'}
          size={'middle'}
          circle
          onClick={handleStartShortBreak}
        />
        <ActionButton
          icon={<FreeBreakfast />}
          text={'long break'}
          size={'middle'}
          circle
          onClick={handleStartLongBreak}
        />
      </Row>
    </Column>
  )
}

export default PartSelectButtons
