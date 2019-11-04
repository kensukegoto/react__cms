import React from "react"
import {
  Box,
  Typography,
  TextField,
  Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {
  makeStyles
} from '@material-ui/core/styles'


const Form__Points = ({work,setWork,selectMode,styles__Form}) => {

  const styles = makeStyles(theme => ({
    points: {
      padding: 0,
      margin: 0,
      listStyleType: "none"
    }
  }))()

  return (
    <Box mb={2}>
    <Typography className={styles__Form.title} variant="subtitle1" component="p">
      ポイント
    </Typography>
    {work.points.length > 0 ?
      <ul className={styles.points}>
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
              disabled={selectMode}
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
        disabled={selectMode}
      >
        <AddIcon />
      </Fab>
    </Box>
  </Box>
  )
}

export default Form__Points