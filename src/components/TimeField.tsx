import { makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'
import { Timer } from '@material-ui/icons'
import NumberField from './NumberField'
import Column from './Column'
import Row from './Row'

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
    <Column>
      <Typography variant={'caption'}>{label}</Typography>
      <Row>
        <Timer />
        <NumberField
          num={min}
          min={0}
          max={99}
          suffix={'min'}
          onChange={(value) => {
            onChange(value * 60 + sec)
            setMin(value)
          }}
          className={classes.time}
        />
        <NumberField
          num={sec}
          min={0}
          max={59}
          suffix={'sec'}
          onChange={(value) => {
            onChange(min * 60 + value)
            setSec(value)
          }}
          className={classes.time}
        />
      </Row>
    </Column>
  )
}

export default TimeField
