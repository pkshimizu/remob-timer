import {
  Box,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { useState } from 'react'
import { Timer } from '@material-ui/icons'

const useStyles = makeStyles({
  time: {
    width: 80,
  },
})

export interface TimeFieldProps {
  value: number
  label: string
  onChange: (time: number) => void
}

function TimeField({ value, label, onChange }: TimeFieldProps) {
  const classes = useStyles()
  const [min, setMin] = useState(Math.floor(value / 60))
  const [sec, setSec] = useState(value % 60)
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography variant={'caption'}>{label}</Typography>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Timer />
        <TextField
          value={min}
          onChange={(event) => {
            const min = Math.max(parseInt(event.target.value), 0)
            const time = min * 60 + sec
            onChange(time)
            setMin(min)
          }}
          type={'number'}
          InputProps={{
            endAdornment: <InputAdornment position={'end'}>min</InputAdornment>,
          }}
          className={classes.time}
        />
        <TextField
          value={sec}
          onChange={(event) => {
            const sec = Math.max(parseInt(event.target.value), 0)
            const time = min * 60 + sec
            onChange(time)
            setSec(sec)
          }}
          type={'number'}
          InputProps={{
            endAdornment: <InputAdornment position={'end'}>sec</InputAdornment>,
          }}
          className={classes.time}
        />
      </Box>
    </Box>
  )
}

export default TimeField
