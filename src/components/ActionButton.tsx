import { Button, makeStyles } from '@material-ui/core'
import { ReactNode } from 'react'
import Column from './Column'

type Size = 'small' | 'middle' | 'large'

export interface ActionButtonStyleProps {
  size?: Size
  circle?: boolean
}

const sizeToPixels = (size: Size) => {
  switch (size) {
    case 'small':
      return '40px'
    case 'middle':
      return '80px'
    case 'large':
      return '160px'
  }
}

const sizeToFontSize = (size: Size) => {
  switch (size) {
    case 'small':
      return 8
    case 'middle':
      return 8
    case 'large':
      return 32
  }
}

const useStyles = makeStyles({
  root: (props: ActionButtonStyleProps) => ({
    fontSize: sizeToFontSize(props.size || 'middle'),
    width: sizeToPixels(props.size || 'middle'),
    height: sizeToPixels(props.size || 'middle'),
    borderRadius: props.circle ? '50%' : undefined,
  }),
})

export interface ActionButtonProps extends ActionButtonStyleProps {
  icon: ReactNode
  text?: string
  color?: 'primary' | 'secondary'
  onClick: () => void
}

function ActionButton({
  icon,
  text,
  size = 'middle',
  circle,
  color = 'primary',
  onClick,
}: ActionButtonProps) {
  const classes = useStyles({
    size: size,
    circle: circle,
  })
  return (
    <Button
      className={classes.root}
      variant={'contained'}
      color={color}
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
