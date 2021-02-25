import { Button, makeStyles } from '@material-ui/core'
import { ReactNode } from 'react'
import Column from './Column'

const useStyles = makeStyles({
  root: {
    fontSize: 16,
  },
})

interface ActionButtonProps {
  icon: ReactNode
  text?: string
  onClick: () => void
}

function ActionButton({ icon, text, onClick }: ActionButtonProps) {
  const classes = useStyles()
  return (
    <Button
      className={classes.root}
      variant={'contained'}
      color={'primary'}
      onClick={onClick}
    >
      <Column>
        {icon}
        {text}
      </Column>
    </Button>
  )
}

export default ActionButton
