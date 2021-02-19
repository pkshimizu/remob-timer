import { Box, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'
import { Timer } from '@material-ui/icons'
import NumberField from './NumberField'

const useStyles = makeStyles({
  time: {
    width: 64,
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
        <Box className={classes.time}>
          <NumberField
            num={min}
            min={0}
            max={99}
            suffix={'min'}
            onChange={(value) => {
              onChange(value * 60 + sec)
              setMin(value)
            }}
          />
        </Box>
        <Box className={classes.time}>
          <NumberField
            num={sec}
            min={0}
            max={59}
            suffix={'sec'}
            onChange={(value) => {
              onChange(min * 60 + value)
              setSec(value)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default TimeField
