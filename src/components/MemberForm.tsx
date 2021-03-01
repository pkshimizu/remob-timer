import { Member, MemberActive, MemberRole } from '../models/member'
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { Add, ArrowDropDown, ArrowDropUp, Close } from '@material-ui/icons'
import { useCallback, useState } from 'react'
import Row from './Row'
import Column from './Column'

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
  first?: boolean
  last?: boolean
  hiddenOrderButtons?: boolean
  onSaveMember: (
    id: string | null,
    name: string,
    role: MemberRole,
    active: MemberActive,
    order?: number,
  ) => void
  onDeleteMember?: () => void
  onUp?: (id: string) => void
  onDown?: (id: string) => void
}

function MemberForm({
  member,
  first,
  last,
  hiddenOrderButtons = false,
  onSaveMember,
  onDeleteMember,
  onUp,
  onDown,
}: MemberFormProps) {
  const classes = useStyles()
  const [name, setName] = useState<string>(member?.name || '')
  const [role, setRole] = useState<MemberRole>(
    member?.role || MemberRole.Navigator,
  )
  const [active, setActive] = useState<MemberActive>(
    member?.active || MemberActive.Active,
  )
  const handleChangeMember = useCallback(
    (name, role, active) => {
      if (member && name && role) {
        onSaveMember(member.id, name, role, active, member.order)
      }
    },
    [member, onSaveMember],
  )
  return (
    <Row>
      {member ? (
        <Checkbox
          checked={active === MemberActive.Active}
          onChange={(event) => {
            const active = event.target.checked
              ? MemberActive.Active
              : MemberActive.Inactive
            setActive(active)
            handleChangeMember(name, role, active)
          }}
        />
      ) : (
        <></>
      )}
      <TextField
        label={'Name'}
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          handleChangeMember(event.target.value, role, active)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSaveMember(null, name, role, active)
            setName('')
            setRole(MemberRole.Navigator)
          }
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
            handleChangeMember(name, event.target.value, active)
          }}
          className={classes.role}
        >
          <MenuItem value={MemberRole.Expert}>Expert</MenuItem>
          <MenuItem value={MemberRole.Navigator}>Navigator</MenuItem>
        </Select>
      </FormControl>
      {hiddenOrderButtons ? (
        <></>
      ) : (
        <Column>
          <ButtonGroup orientation={'vertical'} variant={'text'}>
            <Button
              size={'small'}
              disabled={first}
              onClick={() => {
                if (onUp && member) {
                  onUp(member.id)
                }
              }}
            >
              <ArrowDropUp />
            </Button>
            <Button
              size={'small'}
              disabled={last}
              onClick={() => {
                if (onDown && member) {
                  onDown(member.id)
                }
              }}
            >
              <ArrowDropDown />
            </Button>
          </ButtonGroup>
        </Column>
      )}
      <Button className={classes.button}>
        {member ? (
          <Close onClick={onDeleteMember} />
        ) : (
          <Add
            onClick={() => {
              if (name && role) {
                onSaveMember(null, name, role, active)
                setName('')
                setRole(MemberRole.Navigator)
              }
            }}
          />
        )}
      </Button>
    </Row>
  )
}

export default MemberForm
