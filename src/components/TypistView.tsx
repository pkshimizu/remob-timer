import Row from './Row'
import { KeyboardOutlined } from '@material-ui/icons'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const useStyles = makeStyles({
  root: {
    marginBottom: 8,
  },
  typistIcon: {
    fontSize: 48,
    marginRight: 8,
  },
  typist: {
    fontSize: 32,
  },
})

function TypistView() {
  const classes = useStyles()
  const typist = useSelector<RootState, string | null>((state) => {
    const id = state.states.typist
    return (
      state.members.members.find((member) => member.id === id)?.name || null
    )
  })
  return (
    <>
      {typist === null ? undefined : (
        <Row className={classes.root}>
          <KeyboardOutlined className={classes.typistIcon} />
          <div className={classes.typist}>{typist}</div>
        </Row>
      )}
    </>
  )
}

export default TypistView
