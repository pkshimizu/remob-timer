import { Box, Button, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'

const useStyles = makeStyles({
  status: {
    fontSize: 64,
  },
  driverIcon: {
    fontSize: 64,
  },
  driver: {
    fontSize: 64,
  },
  remainingTime: {
    marginTop: 32,
    fontSize: 64,
  },
  actions: {
    '& > *': {
      margin: 8,
    },
  },
})

function App() {
  const classes = useStyles()
  const driver = 'Typist Name'
  const remainingTime = 365
  return (
    <Container>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <div className={classes.status}>1st Interval</div>
        <Box display={'flex'} alignItems={'center'}>
          <KeyboardOutlined className={classes.driverIcon} />
          <div className={classes.driver}>{driver}</div>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <div className={classes.remainingTime}>
            {Math.floor(remainingTime / 60)} min {remainingTime % 60} sec
          </div>
        </Box>
        <Box display={'flex'} alignItems={'center'} className={classes.actions}>
          <Button variant={'contained'} color={'primary'}>
            Member Settings
          </Button>
          <Button variant={'contained'} color={'primary'}>
            Interval Settings
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default App
