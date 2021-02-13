import { Box, Button, Container, Dialog, Typography } from '@material-ui/core'
import { Member } from '../models/member'
import MemberForm from './MemberForm'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { addMember, deleteMember, updateMember } from '../store/members/actions'
import { RootState } from '../store'

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
    (id, name, role) => {
      dispatch(updateMember(id, name, role))
    },
    [dispatch],
  )
  const handleDeleteMember = useCallback(
    (id) => {
      dispatch(deleteMember(id))
    },
    [dispatch],
  )
  return (
    <Dialog open={open} fullScreen>
      <Container>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography variant={'h4'}>Member Settings</Typography>
          <MemberForm onSaveMember={handleAddMember} />
          {members.map((member) => (
            <MemberForm
              member={member}
              key={member.id}
              onSaveMember={handleUpdateMember}
              onDeleteMember={() => handleDeleteMember(member.id)}
            />
          ))}
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Container>
    </Dialog>
  )
}

export default MemberSettingsPage
