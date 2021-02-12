import { InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { useState } from 'react'
import { Timer } from '@material-ui/icons'

const useStyles = makeStyles({
  time: {
    width: 160,
  },
})

export interface TimeFieldProps {
  value: number
  label: string
  onChange: (time: number) => void
}

function TimeField({ value, label, onChange }: TimeFieldProps) {
  const classes = useStyles()
  const [time, setTime] = useState(value)
  return (
    <TextField
      label={label}
      value={time / 60}
      onChange={(event) => {
        const value = Math.max(parseInt(event.target.value), 0)
        const time = value * 60
        onChange(time)
        setTime(time)
      }}
      type={'number'}
      InputProps={{
        startAdornment: <Timer />,
        endAdornment: <InputAdornment position={'end'}>min</InputAdornment>,
      }}
      className={classes.time}
    />
  )
}

export default TimeField
