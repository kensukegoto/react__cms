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

  const {　works, dispatch　} = useContext(AppContext)

  const [ state, setState ] = useState(getInitState())
  useEffect(()=>{
    setState(getInitState())
  },[id])

  function getInitState(){
    const work = works.filter(work => id === work.id)
    return work.length === 0 ? {
      title: '',
      descritption: ''
    } : work[0]
  }


  const classes = useStyles()

  const onSubmit = (edit) => {

    const info = {
      title: state.title,
      description: state.description
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
        className={edit?'':classes.FormControl}
        fullWidth
        onChange={e=>setState({...state, title :e.target.value})}
        value={state.title}
      />
      <TextField
        label="概要"
        className={edit?'':classes.FormControl}
        fullWidth
        multiline
        onChange={e=>setState({...state, description :e.target.value})}
        value={state.description}
      />

      <Button
        variant="outlined"
      >
        追加
      </Button>

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