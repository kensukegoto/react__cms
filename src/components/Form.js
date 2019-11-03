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


const Form = ({ setOpen = null,id = null,editMode = null }) => {

  const edit = editMode

   // 0 create 1 edit 2 select
  const mode = (editMode === true) ? 1 : (editMode === null ) ? 0 : 2

  const useStyles = makeStyles(theme => ({
    FormControl: {
      width: 500
    },
    hide:{
      display: 'none'
    },
    Submit: {
      display: 'block',
      margin: '0 auto'
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

  const [ state, setState ] = useState(getInitState())
  const [ tmb, setTmb  ] = useState(null)

  // idかworksの変更があれば再レンダリング
  useEffect(()=>{
    setState(getInitState())
  },[id,works])

  function getInitState(){
    const work = works.filter(work => id === work.id)
    return work.length === 0 ? {
      title: '',
      description: '',
      points: [],
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
    const points = state.points.reduce((acc,point)=>{
      if(point.trim() !== ''){
        acc.push(point)
      }
      return acc
    },[])

    const info = {
      title: state.title,
      description: state.description,
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
      <div>
        <TextField
          label="タイトル"
          className={edit?'':classes.FormControl}
          fullWidth
          onChange={e=>setState({...state, title :e.target.value})}
          value={state.title}
          disabled={mode===2}
        />
      </div>
      <div>
        <TextField
          label="概要"
          className={edit?'':classes.FormControl}
          fullWidth
          multiline
          onChange={e=>setState({...state, description :e.target.value})}
          value={state.description}
          disabled={mode===2}
        />
      </div>
      <div>
        {state.points.length > 0 ?
          <ul className={classes.Points}>
          {state.points.map((point,idx)=>{
            return (
              <li key={idx}>
                <TextField 
                  label="ポイント"
                  fullWidth
                  onChange={e=>{ 
                    let points = [...state.points]
                    points[idx] = e.target.value
                    setState({...state, points})
                  }}
                  value={point}
                  disabled={mode===2}
                />
              </li>
            )
          })}
          </ul>
        : ""
        }
      {/* ポイント追加 ボタン */}
      <Button
        variant="outlined"
        onClick={()=>setState({...state, points: [...state.points,""]})}
        className={mode===2?classes.hide:''}
      >
        追加
      </Button>
      </div>
      <div>
        <div>
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
            <Button variant="outlined" component="span">
              サムネのアップロード
            </Button>
          </label>
        </div>
        {
          console.log(tmb)
        }
        {
        !tmb
        ?
          state.tmb!==""
          ?
            <img src={state.tmb} alt="サムネ" className={classes.Preview}  />
          :
            ""
        :
          <img src={tmb} alt="プレビュー画像" className={classes.Preview} />
        }
      </div>
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