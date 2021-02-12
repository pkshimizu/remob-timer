import { Member, MemberRole } from '../models/member'
import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { useCallback, useState } from 'react'

const useStyles = makeStyles({
  name: {
    width: 160,
    margin: 8,
  },
  role: {
    width: 120,
    margin: 8,
  },
  button: {
    width: 64,
  },
})

interface MemberFormProps {
  member?: Member
  onSaveMember: (name: string, role: MemberRole) => void
  onDeleteMember?: () => void
}

function MemberForm({ member, onSaveMember, onDeleteMember }: MemberFormProps) {
  const classes = useStyles()
  const [name, setName] = useState<string>(member?.name || '')
  const [role, setRole] = useState<MemberRole>(
    member?.role || MemberRole.Navigator,
  )
  const handleChangeMember = useCallback((name, role) => {
    if (member && name && role) {
      onSaveMember(name, role)
    }
  }, [])
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
      <TextField
        label={'Name'}
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          handleChangeMember(event.target.value, role)
        }}
        className={classes.name}
      />
      <Select
        label={'Role'}
        value={role}
        onChange={(event) => {
          setRole(event.target.value as MemberRole)
          handleChangeMember(name, event.target.value)
        }}
        className={classes.role}
      >
        <MenuItem value={MemberRole.Expert}>Expert</MenuItem>
        <MenuItem value={MemberRole.Navigator}>Navigator</MenuItem>
      </Select>
      <Button className={classes.button}>
        {member ? (
          <Delete onClick={onDeleteMember} />
        ) : (
          <Add
            onClick={() => {
              if (name && role) {
                onSaveMember(name, role)
                setName('')
                setRole(MemberRole.Navigator)
              }
            }}
          />
        )}
      </Button>
    </Box>
  )
}

export default MemberForm
