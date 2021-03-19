import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Notifications, NotificationsOff } from '@material-ui/icons'
import { useCallback } from 'react'
import { updateSettings } from '../store/settings/actions'
import { Settings } from '../models/settings'

export interface BellButtonProps {
  className: string
}

function BellButton({ className }: BellButtonProps) {
  const silent = useSelector<RootState, boolean>(
    (state) => state.settings.silent,
  )
  const settings = useSelector<RootState, Settings>((state) => state.settings)
  const dispatch = useDispatch()
  const handleToggle = useCallback(() => {
    dispatch(
      updateSettings({
        ...settings,
        silent: !silent,
      }),
    )
  }, [silent, settings, dispatch])
  return (
    <IconButton className={className} onClick={handleToggle}>
      {silent ? (
        <NotificationsOff color={'secondary'} />
      ) : (
        <Notifications color={'primary'} />
      )}
    </IconButton>
  )
}

export default BellButton
