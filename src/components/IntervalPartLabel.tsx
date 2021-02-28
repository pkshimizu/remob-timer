import { makeStyles } from '@material-ui/core'
import { IntervalPart, States, TimerState } from '../models/states'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const useStyles = makeStyles({
  root: {
    fontSize: 32,
  },
})

const intervalPartLabel = (states: States): string => {
  if (states.timerState === TimerState.stopped) {
    return 'Select'
  }
  switch (states.intervalPart) {
    case IntervalPart.work:
      return 'Work'
    case IntervalPart.shortBreak:
      return 'Break'
    case IntervalPart.longBreak:
      return 'Long Break'
  }
  return 'Unknown'
}

function IntervalPartLabel() {
  const classes = useStyles()
  const states = useSelector<RootState, States>((state) => state.states)
  return <div className={classes.root}>{intervalPartLabel(states)}</div>
}

export default IntervalPartLabel
