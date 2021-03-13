import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function VersionView() {
  const version = useSelector<RootState, string | undefined>(
    (state) => state.session.version,
  )
  return <Typography variant={'caption'}>Version: {version}</Typography>
}

export default VersionView
