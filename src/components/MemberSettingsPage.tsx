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
    (id, name, role, active, order) => {
      dispatch(
        updateMember({
          id: id,
          name: name,
          role: role,
          active: active,
          order: order,
        }),
      )
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
      const targetIndex = members.findIndex((member) => member.id === id)
      if (
        targetIndex === undefined ||
        targetIndex === -1 ||
        targetIndex === 0
      ) {
        return
      }
      members.forEach((member, index) => {
        const order =
          index === targetIndex - 1
            ? targetIndex
            : index === targetIndex
            ? targetIndex - 1
            : index
        dispatch(
          updateMember({
            ...member,
            order: order,
          }),
        )
      })
    },
    [dispatch, members],
  )
  const handleDown = useCallback(
    (id) => {
      const targetIndex = members.findIndex((member) => member.id === id)
      if (
        targetIndex === undefined ||
        targetIndex === -1 ||
        targetIndex === members.length - 1
      ) {
        return
      }
      members.forEach((member, index) => {
        const order =
          index === targetIndex + 1
            ? targetIndex
            : index === targetIndex
            ? targetIndex + 1
            : index
        dispatch(
          updateMember({
            ...member,
            order: order,
          }),
        )
      })
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
