import {
  Button,
  Container,
  Dialog,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import { Settings, TypistSelectType } from '../models/settings'
import { useState } from 'react'
import TimeField from './TimeField'
import Column from './Column'

const useStyles = makeStyles({
  main: {
    margin: 16,
  },
  title: {
    marginBottom: 8,
  },
  typist: {
    width: 160,
  },
  fields: {
    '& > *': {
      marginBottom: 8,
    },
  },
})

export interface IntervalSettingsPageProps {
  open: boolean
  settings: Settings
  onSave: (settings: Settings) => void
  onClose: () => void
}

function IntervalSettingsPage({
  open,
  settings,
  onSave,
  onClose,
}: IntervalSettingsPageProps) {
  const classes = useStyles()
  const [typistSelectionType, setTypistSelectionType] = useState(
    settings.typistSelectionType,
  )
  return (
    <Dialog open={open} fullScreen>
      <Container>
        <Column className={classes.main}>
          <Typography variant={'h4'} className={classes.title}>
            Interval Settings
          </Typography>
          <Column className={classes.fields}>
            <TimeField
              label={'Work Time'}
              value={settings.workTime}
              onChange={(time) => {
                onSave({
                  ...settings,
                  workTime: time,
                })
              }}
            />
            <TimeField
              label={'Cool Down Time'}
              value={settings.coolDownTime}
              onChange={(time) => {
                onSave({
                  ...settings,
                  coolDownTime: time,
                })
              }}
            />
            <TimeField
              label={'Short Break Time'}
              value={settings.shortBreakTime}
              onChange={(time) => {
                onSave({
                  ...settings,
                  shortBreakTime: time,
                })
              }}
            />
            <TimeField
              label={'Long Break Time'}
              value={settings.longBreakTime}
              onChange={(time) => {
                onSave({
                  ...settings,
                  longBreakTime: time,
                })
              }}
            />
            <FormControl>
              <InputLabel id={'typist-select-type'}>
                Typist Select Strategy
              </InputLabel>
              <Select
                labelId={'typist-select-type'}
                value={typistSelectionType}
                onChange={(event) => {
                  const type = event.target.value as TypistSelectType
                  setTypistSelectionType(type)
                  onSave({
                    ...settings,
                    typistSelectionType: type,
                  })
                }}
                className={classes.typist}
              >
                <MenuItem value={TypistSelectType.rotation}>Rotation</MenuItem>
                <MenuItem value={TypistSelectType.random}>Random</MenuItem>
              </Select>
            </FormControl>
          </Column>
          <Button onClick={onClose}>Close</Button>
        </Column>
      </Container>
    </Dialog>
  )
}

export default IntervalSettingsPage
