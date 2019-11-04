import React,{ useState } from 'react'

import {
  Fab,
  Dialog,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import Form from './Form'
import AddIcon from '@material-ui/icons/Add'

const Modal = () => {

  const [ open,setOpen ] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">作品登録</DialogTitle>
        <DialogContent>
          <Form setOpen={setOpen} mode="create" />
        </DialogContent>
      </Dialog>
    </>
  )


}

export default Modal