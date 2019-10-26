import React,{ useState } from 'react';

import {
  Button,
  TextField
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'

const Form = ({ setOpen }) => {

  const useStyles = makeStyles(theme => ({
    FormControl: {
      width: 500
    },
    Submit: {
      display: 'block',
      margin: '0 auto'
    }
  }))

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')


  const classes = useStyles()

  const onSubmit = () => {
    
    const info = {
      title,
      description
    }
    console.log(info)
    
    setOpen(false)
  }

  return (
    <form>
      <TextField
        label="タイトル"
        className={classes.FormControl}
        onChange={e=>setTitle(e.target.value)} 
      />
      <TextField
        label="概要"
        className={classes.FormControl}
        onChange={e=>setDescription(e.target.value)} 
      />
      <br/>
      <br/>
      <Button 
        className={classes.Submit}
        variant="contained" 
        color='primary' 
        onClick={onSubmit}
      >
        登録
      </Button>
    </form>
  )
}

export default Form