import React,{ useState,useContext,useEffect } from 'react';

import {
  Fab,
  Box,
  Button,
  TextField,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {
  makeStyles
} from '@material-ui/core/styles'

import {
  CREATE_EVENT,
  EDIT_EVENT
} from '../actions'

import AppContext from '../contexts/AppContext'


const Form = ({ setOpen = null,id = null,editMode = null }) => {

  const edit = editMode

   // 0 create 1 edit 2 select
  const mode = (editMode === true) ? 1 : (editMode === null ) ? 0 : 2

  const useStyles = makeStyles(theme => ({
    FormControl: {
      width: 500
    },
    Title:{
      fontWeight: "bold"
    },
    hide:{
      display: 'none'
    },
    Submit: {
      display: 'block',
      margin: '0 auto'
    },
    mR_1: {
      marginRight: theme.spacing(1)
    },
    Preview: {
      width: '150px'
    },
    Points: {
      padding: 0,
      margin: 0,
      listStyleType: "none"
    }
  }))

  const {　works, dispatch　} = useContext(AppContext)

  const [ work, setWork ] = useState(getInitWork())
  const [ tmb, setTmb  ] = useState(null)

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


  const classes = useStyles()

  const review = e => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      setTmb(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  const onSubmit = (mode) => {

    const edit = mode === 1 ? true : false

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
    
    if(!edit){
      dispatch({
        type: CREATE_EVENT,
        info
      })
      setTmb(null)
      setOpen(false)
    }else{
      dispatch({
        type: EDIT_EVENT,
        info,
        id
      })
    }

    setTmb(null)
  }

  return (
    <form>
      <Box mb={2}>
        <Typography className={classes.Title} variant="subtitle1" component="p">
          タイトル
        </Typography>
        <TextField
          className={edit?'':classes.FormControl}
          fullWidth
          onChange={e=>setWork({...work, title :e.target.value})}
          value={work.title}
          disabled={mode===2}
        />
      </Box>
      <Box mb={2}>
        <Typography className={classes.Title} variant="subtitle1" component="p">
          概要
        </Typography>
        <TextField
          className={edit?'':classes.FormControl}
          fullWidth
          multiline
          onChange={e=>setWork({...work, description :e.target.value})}
          value={work.description}
          disabled={mode===2}
        />
      </Box>
      <Box mb={2}>
        <Typography className={classes.Title} variant="subtitle1" component="p">
          ポイント
        </Typography>
        {work.points.length > 0 ?
          <ul className={classes.Points}>
          {work.points.map((point,idx)=>{
            return (
              <li key={idx}>
                <Box mb={2}>
                <TextField 
                  fullWidth
                  onChange={e=>{ 
                    let points = [...work.points]
                    points[idx] = e.target.value
                    setWork({...work, points})
                  }}
                  value={point}
                  disabled={mode===2}
                />
                </Box>
              </li>
            )
          })}
          </ul>
        : ""
        }
        <Box mt={2}>
          <Fab 
            aria-label="add" 
            onClick={()=>setWork({...work, points: [...work.points,""]})}
            className={mode===2?classes.hide:''}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <Box mb={2}>
        <Typography className={classes.Title} variant="subtitle1" component="p">
          URL
        </Typography>
        <TextField
          className={edit?'':classes.FormControl}
          fullWidth
          onChange={e=>setWork({...work, url :e.target.value})}
          value={work.url}
          disabled={mode===2}
        />
      </Box>
      <Box mb={2}>
        <Typography className={classes.Title} variant="subtitle1" component="p">
          サムネイル
        </Typography>
        {
        !tmb
        ?
          work.tmb!==""
          ?
          <Box mb={2} mt={2}><img src={work.tmb} alt="サムネ" className={classes.Preview}  /></Box>
          :
            ""
        :
        <Box mb={2} mt={2}><img src={tmb} alt="プレビュー画像" className={classes.Preview} /></Box>
        }
        <Box mb={2} mt={2}>
          <input
            accept="image/*"
            className={classes.hide}
            id={"upload_btn_" + mode}
            multiple
            type="file"
            onChange={e=>{
              review(e)
            }}
          />
          <label htmlFor={"upload_btn_" + mode}>
            <Button variant="contained" component="span" className={classes.mR_1}>
              アップロード
            </Button>
          </label>
          <Button variant="contained" component="span">
              削除
          </Button>
        </Box>

      </Box>
      <div>

    {
    mode===0?
      <Button 
        className={classes.Submit}
        variant="contained" 
        color='primary' 
        onClick={()=>onSubmit(mode)}
      >
        登録
      </Button>
      :
    mode===1?
      <Button 
      className={classes.Submit}
      variant="contained" 
      color='primary' 
      onClick={()=>onSubmit(mode)}
      >
        更新
      </Button>
      :
      null
    }
      </div>
    </form>
  )
}

export default Form