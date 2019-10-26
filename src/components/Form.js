import React,{ useState,useContext,useEffect } from 'react';

import {
  Button,
  TextField
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'

import {
  CREATE_EVENT,
  EDIT_EVENT
} from '../actions'

import AppContext from '../contexts/AppContext'


const Form = ({ setOpen = null,id = null }) => {



  const edit = id ? true : false

  const useStyles = makeStyles(theme => ({
    FormControl: {
      width: 500
    },
    Submit: {
      display: 'block',
      margin: '0 auto'
    }
  }))

  const {　works,dispatch　} = useContext(AppContext)

  const [title,setTitle] = useState(initTitle())

  function initTitle () {
    const work = works.filter(work => id === work.id)
    return work.length === 0 ? '': work[0].h4
  }

  useEffect(()=>{
    setTitle(initTitle)
  },[id])


  const classes = useStyles()

  const onSubmit = (edit) => {

    const info = {
      h4: title
    }
    
    if(!edit){
      dispatch({
        type: CREATE_EVENT,
        info
      })
  
      setOpen(false)
    }else{
      dispatch({
        type: EDIT_EVENT,
        info,
        id
      })
    }

  }

  return (
    <form>
      <TextField
        label="タイトル"
        className={classes.FormControl}
        onChange={e=>setTitle(e.target.value)}
        value={title}
      />

      <br/>
      <br/>
      {!edit?
      <Button 
        className={classes.Submit}
        variant="contained" 
        color='primary' 
        onClick={()=>onSubmit(edit)}
      >
        登録
      </Button>
      :
      <Button 
      className={classes.Submit}
      variant="contained" 
      color='primary' 
      onClick={()=>onSubmit(edit)}
      >
        更新
      </Button>
    }

    </form>
  )
}

export default Form