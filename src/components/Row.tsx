import { Box } from '@material-ui/core'
import { ReactNode } from 'react'

export interface RowProps {
  align?: 'left' | 'center' | 'right'
  children: ReactNode
  className?: string
}

function Row({ align = 'center', children, className }: RowProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={align}
      className={className}
    >
      {children}
    </Box>
  )
}

export default Row
