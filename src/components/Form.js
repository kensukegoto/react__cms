import React,{ useState,useContext,useEffect } from 'react';

import {
  Box,
  Button,
  TextField,
  Typography
} from '@material-ui/core'

import Form__Points from './Form__Points'
import Form__Tmb from './Form__Tmb'

import {
  makeStyles
} from '@material-ui/core/styles'

import {
  CREATE_EVENT,
  EDIT_EVENT
} from '../actions'

import AppContext from '../contexts/AppContext'

const Form = ({ setOpen = null,id = null,mode = "select" }) => {

  const createMode = mode === "create"
  const selectMode = mode === "select"

  const styles__Form = makeStyles(theme => ({
    formControl: {
      width: 500
    },
    title:{
      fontWeight: "bold"
    },
    hide:{
      display: 'none'
    },
    submit: {
      display: 'block',
      margin: '0 auto'
    },

  }))()

  const {　works, dispatch　} = useContext(AppContext)

  const [ work, setWork ] = useState(getInitWork())
  const [ tmb, setTmb ] = useState(null)

  // idかworksの変更があれば再レンダリング
  useEffect(()=>{
    setTmb(null)
    setWork(getInitWork())
  },[id,works])

  function getInitWork(){
    const work = works.filter(work => id === work.id)
    return work.length === 0 ? {
      title: '',
      description: '',
      points: [],
      url: '',
      tmb: ''
    } : work[0]
  }

  const onSubmit = () => {

    // pointsの空文字チェック
    const points = work.points.reduce((acc,point)=>{
      if(point.trim() !== ''){
        acc.push(point)
      }
      return acc
    },[])

    const info = {
      title: work.title,
      description: work.description,
      url: work.url,
      points,
      tmb
    }
    
    if(createMode){
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
      {/* タイトル */}
      <Box mb={2}>
        <Typography className={styles__Form.title} variant="subtitle1" component="p">
          タイトル
        </Typography>
        <TextField
          className={!createMode ? "" : styles__Form.formControl}
          fullWidth
          onChange={e=>setWork({...work, title :e.target.value})}
          value={work.title}
          disabled={selectMode}
        />
      </Box>
      {/* 概要 */}
      <Box mb={2}>
        <Typography className={styles__Form.title} variant="subtitle1" component="p">
          概要
        </Typography>
        <TextField
          className={!createMode ? "" :styles__Form.formControl}
          fullWidth
          multiline
          onChange={e=>setWork({...work, description :e.target.value})}
          value={work.description}
          disabled={selectMode}
        />
      </Box>
      {/* ポイント */}
      <Form__Points work={work} setWork={setWork} selectMode={selectMode} styles__Form={styles__Form} />
      {/* URL */}
      <Box mb={2}>
        <Typography className={styles__Form.title} variant="subtitle1" component="p">
          URL
        </Typography>
        <TextField
          className={!createMode ? "" :styles__Form.formControl}
          fullWidth
          onChange={e=>setWork({...work, url :e.target.value})}
          value={work.url}
          disabled={selectMode}
        />
      </Box>
      {/* サムネイル */}
      <Form__Tmb tmb={tmb} setTmb={setTmb} work={work} mode={mode} selectMode={selectMode} styles__Form={styles__Form} />
      <div>
      <Button 
        className={styles__Form.submit}
        variant="contained" 
        color='primary' 
        onClick={()=>onSubmit()}
        disabled={selectMode}
      >
      {
        createMode ? "登録" : "更新"
      }
      </Button>


      </div>
    </form>
  )
}

export default Form