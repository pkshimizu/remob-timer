import { Button, Container, Dialog, Typography } from '@material-ui/core'
import { Member } from '../models/member'
import MemberForm from './MemberForm'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { addMember, deleteMember, updateMember } from '../store/members/actions'
import { RootState } from '../store'
import Column from './Column'

export interface MemberSettingsPageProps {
  open: boolean
  onClose: () => void
}

function MemberSettingsPage({ open, onClose }: MemberSettingsPageProps) {
  const members = useSelector<RootState, Member[]>(
    (state) => state.members.members,
  )
  const dispatch = useDispatch()
  const handleAddMember = useCallback(
    (id, name, role) => {
      dispatch(addMember(name, role))
    },
    [dispatch],
  )
  const handleUpdateMember = useCallback(
    (id, name, role, order) => {
      dispatch(updateMember(id, name, role, order))
    },
    [dispatch],
  )
  const handleDeleteMember = useCallback(
    (id) => {
      dispatch(deleteMember(id))
    },
    [dispatch],
  )
  const handleUp = useCallback(
    (id) => {
      const member = members.find((member) => member.id === id)
      if (member === undefined || member.order === 0) {
        return
      }
      const shiftMember = members.find(
        (other) => other.order === member.order - 1,
      )
      if (shiftMember === undefined) {
        return
      }
      dispatch(
        updateMember(member.id, member.name, member.role, member.order - 1),
      )
      dispatch(
        updateMember(
          shiftMember.id,
          shiftMember.name,
          shiftMember.role,
          shiftMember.order + 1,
        ),
      )
    },
    [dispatch, members],
  )
  const handleDown = useCallback(
    (id) => {
      const member = members.find((member) => member.id === id)
      if (member === undefined || member.order === members.length - 1) {
        return
      }
      const shiftMember = members.find(
        (other) => other.order === member.order + 1,
      )
      if (shiftMember === undefined) {
        return
      }
      dispatch(
        updateMember(member.id, member.name, member.role, member.order + 1),
      )
      dispatch(
        updateMember(
          shiftMember.id,
          shiftMember.name,
          shiftMember.role,
          shiftMember.order - 1,
        ),
      )
    },
    [dispatch, members],
  )
  return (
    <Dialog open={open} fullScreen>
      <Container>
        <Column>
          <Typography variant={'h4'}>Member Settings</Typography>
          <MemberForm onSaveMember={handleAddMember} hiddenOrderButtons />
          {members.map((member, index) => (
            <MemberForm
              member={member}
              key={member.id}
              first={index === 0}
              last={index === members.length - 1}
              onUp={handleUp}
              onDown={handleDown}
              onSaveMember={handleUpdateMember}
              onDeleteMember={() => handleDeleteMember(member.id)}
            />
          ))}
          <Button onClick={onClose}>Close</Button>
        </Column>
      </Container>
    </Dialog>
  )
}

export default MemberSettingsPage
