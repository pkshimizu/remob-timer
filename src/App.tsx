import { Box, Button, Container, makeStyles } from '@material-ui/core'
import { KeyboardOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { IntervalState } from './models/interval_state'
import { createSession } from './store/sessions/actions'
import { useEffect } from 'react'

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    marginBottom: 16,
  },
  status: {
    fontSize: 32,
  },
  typistIcon: {
    fontSize: 32,
  },
  typist: {
    fontSize: 32,
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
  const id = useSelector<RootState, string>((state) => state.session.id)
  const intervalState = useSelector<RootState, IntervalState>(
    (state) => state.intervalState,
  )
  const path = window.location.pathname
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(`path: ${path} id: ${id}`)
    if (path === '/') {
      if (id !== '') {
        window.location.pathname = `/${id}`
      } else {
        dispatch(createSession())
      }
    }
  }, [dispatch, path, id])
  const classes = useStyles()
  const typist = intervalState.typist
  const remainingTime = 365
  return (
    <Container className={classes.root}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <div className={classes.status}>1st Interval</div>
        <Box display={'flex'} alignItems={'center'}>
          <KeyboardOutlined className={classes.typistIcon} />
          <div className={classes.typist}>{typist}</div>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <div className={classes.remainingTime}>
            {Math.floor(remainingTime / 60)} min {remainingTime % 60} sec
          </div>
        </Box>
        <Box display={'flex'} alignItems={'center'} className={classes.actions}>
          <Button variant={'outlined'} color={'primary'}>
            Member Settings
          </Button>
          <Button variant={'outlined'} color={'primary'}>
            Interval Settings
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default App
