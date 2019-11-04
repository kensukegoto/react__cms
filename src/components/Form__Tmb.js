import React,{ useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'

const Form__Tmb = ({work,mode,selectMode,styles__Form,tmb,setTmb}) => {

  const styles = makeStyles(theme => ({
    Preview: {
      width: "150px"
    },
    hide:{
      display: 'none'
    },
    button: {
      marginRight: theme.spacing(1),
    },
  }))()


  const review = e => {
  
    const files = e.target.files;

    if(files){
      const file = files[0];
      const reader = new FileReader();
      reader.onload = e => {
        setTmb({
          state: 1,
          val: e.target.result
        });
      }
      reader.readAsDataURL(file);
    }else{
        setTmb({...tmb,val:""});
    }

  }

  const clearReview = () => {
    setTmb({state:1,val:""});
  }

  return (
    <Box mb={2}>
    <Typography className={styles__Form.title} variant="subtitle1" component="p">
      サムネイル
    </Typography>
    {
      (()=>{  
        if(tmb.state){
          return (tmb.val!=="") ? 
          <Box mb={2} mt={2}><img src={tmb.val} alt="プレビュー画像" className={styles.Preview} /></Box>
          : ""
        } 

        return (work.tmb!=="") ? 
          <Box mb={2} mt={2}><img src={work.tmb} alt="サムネ画像" className={styles.Preview} /></Box>
          :""

      })()
    }

    <Box mb={2} mt={2}>
      <input
        accept="image/*"
        className={styles__Form.hide}
        id={"upload_btn_" + mode}
        multiple
        type="file"
        onChange={e=>{
          review(e)
        }}
        disabled={selectMode}
      />
      <label htmlFor={"upload_btn_" + mode}>
        <Button variant="contained" component="span" className={styles.button} disabled={selectMode}>
          アップロード
        </Button>
      </label>
      <Button variant="contained" component="span" className={styles.button} disabled={selectMode} onClick={clearReview}>
          削除
      </Button>
    </Box>
  </Box>
  )
} 

export default Form__Tmb