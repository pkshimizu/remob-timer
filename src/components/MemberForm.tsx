import { Member, MemberRole } from '../models/member'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { Add, ExitToApp } from '@material-ui/icons'
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
  onSaveMember: (
    id: string | null,
    name: string,
    role: MemberRole,
    order?: number,
  ) => void
  onDeleteMember?: () => void
}

function MemberForm({ member, onSaveMember, onDeleteMember }: MemberFormProps) {
  const classes = useStyles()
  const [name, setName] = useState<string>(member?.name || '')
  const [role, setRole] = useState<MemberRole>(
    member?.role || MemberRole.Navigator,
  )
  const handleChangeMember = useCallback(
    (name, role) => {
      if (member && name && role) {
        onSaveMember(member.id, name, role, member.order)
      }
    },
    [member, onSaveMember],
  )
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
      <FormControl>
        <InputLabel id={'member-role'}>Role</InputLabel>
        <Select
          labelId={'member-role'}
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
      </FormControl>
      <Button className={classes.button}>
        {member ? (
          <ExitToApp onClick={onDeleteMember} />
        ) : (
          <Add
            onClick={() => {
              if (name && role) {
                onSaveMember(null, name, role)
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
