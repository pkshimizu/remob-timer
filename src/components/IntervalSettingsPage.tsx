import {
  Box,
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

const useStyles = makeStyles({
  typist: {
    width: 160,
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
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography variant={'h4'}>Interval Settings</Typography>
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
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Container>
    </Dialog>
  )
}

export default IntervalSettingsPage
