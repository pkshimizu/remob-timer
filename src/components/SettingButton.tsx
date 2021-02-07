import { Button } from '@material-ui/core'
import { ReactNode } from 'react'

interface SettingButtonProps {
  children: ReactNode
  onClick: () => void
}

function SettingButton({ children, onClick }: SettingButtonProps) {
  return (
    <Button variant={'outlined'} color={'primary'} onClick={onClick}>
      {children}
    </Button>
  )
}

export default SettingButton
