import { Button, makeStyles } from '@material-ui/core'
import { ReactNode } from 'react'

const useStyles = makeStyles({
  root: {
    fontSize: 32,
    width: 512,
  },
})

interface ActionButtonProps {
  children: ReactNode
  onClick: () => void
}

function ActionButton({ children, onClick }: ActionButtonProps) {
  const classes = useStyles()
  return (
    <Button
      className={classes.root}
      variant={'contained'}
      color={'primary'}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ActionButton
