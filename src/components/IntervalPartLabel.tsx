import { makeStyles } from '@material-ui/core'
import { IntervalPart, States, TimerState } from '../models/states'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const useStyles = makeStyles({
  root: {
    fontSize: 32,
    marginBottom: 8,
  },
})

const intervalPartLabel = (states: States): string => {
  if (states.timerState === TimerState.stopped) {
    return "What's next?"
  }
  switch (states.intervalPart) {
    case IntervalPart.work:
      return 'WORK'
    case IntervalPart.shortBreak:
      return 'BREAK'
    case IntervalPart.longBreak:
      return 'LONG BREAK'
  }
  return 'Unknown'
}

function IntervalPartLabel() {
  const classes = useStyles()
  const states = useSelector<RootState, States>((state) => state.states)
  return <div className={classes.root}>{intervalPartLabel(states)}</div>
}

export default IntervalPartLabel
