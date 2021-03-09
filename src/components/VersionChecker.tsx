import React, { useEffect } from 'react'
import { fetchVersion } from '../store/sessions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Snackbar } from '@material-ui/core'
import { RootState } from '../store'
import { Alert } from '@material-ui/lab'

function VersionChecker() {
  const requiredUpdate = useSelector<RootState, boolean>(
    (state) => state.session.requiredUpdate,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchVersion())
    }, 1000 * 60 * 10)
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <Snackbar open={requiredUpdate}>
      <Alert
        severity={'warning'}
        action={
          <Button
            size={'small'}
            onClick={() => {
              window.location.reload()
            }}
          >
            Update
          </Button>
        }
      >
        Please Update
      </Alert>
    </Snackbar>
  )
}

export default VersionChecker
