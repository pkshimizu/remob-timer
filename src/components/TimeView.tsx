import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import Row from './Row'
import Column from './Column'

const useStyle = makeStyles({
  min: {
    fontSize: 32,
    margin: 8,
  },
  sec: {
    fontSize: 32,
    margin: 8,
  },
  unit: {
    fontSize: 16,
  },
})

export interface TimeViewProps {
  value: number
  max: number
}

const zeroPadding = (value: number, len: number) => {
  return (Array(len).join('0') + value).slice(-len)
}

function TimeView({ value, max }: TimeViewProps) {
  const classes = useStyle()
  const min = Math.floor(value / 60)
  const sec = value % 60
  return (
    <Box position={'relative'} display={'inline-flex'}>
      <CircularProgress
        variant={'determinate'}
        value={Math.min((value / max) * 100, 100)}
        size={160}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position={'absolute'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Row>
          <Column className={classes.min}>
            <Box>{zeroPadding(min, 2)}</Box>
            <Box className={classes.unit}>min</Box>
          </Column>
          <Column className={classes.sec}>
            <Box>{zeroPadding(sec, 2)}</Box>
            <Box className={classes.unit}>sec</Box>
          </Column>
        </Row>
      </Box>
    </Box>
  )
}

export default TimeView
