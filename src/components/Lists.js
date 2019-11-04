import React,{ useContext,useState } from 'react'

import {
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import Form from './Form'

import { makeStyles } from '@material-ui/core/styles'

import  AppContext from '../contexts/AppContext'


const useStyles = makeStyles(theme => ({
  paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 600,
    overflowY: "auto"
  }
}))

const  Lists = () => {

  const classes = useStyles()

  const {works} = useContext(AppContext)
  const [id,setId]= useState(works.length)
  const [mode,setMode]= useState("select")

  const onSelect = (id) => {
    setId(id)
    setMode("select")
  }

  const onEdit = (id) => {
    setId(id)
    setMode("edit")
  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm>
          <Paper className={classes.paper}>
            <List>
          {
            works.map(work => {

              return (
                <ListItem button key={work.id}>
                  <Grid container>
                    <Grid item sm={9}>
                    <ListItemText primary={`${work.title}`} onClick={()=>onSelect(work.id)} />
                    </Grid>
                    <Grid item sm>
                      <ListItemSecondaryAction>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={()=>onEdit(work.id)}>
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Grid>
                  </Grid>
                </ListItem>
              )
            })
          }
          </List>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper className={classes.paper}>
            <Form id={id} mode={mode} />
          </Paper>
        </Grid>
      </Grid>
    </>
  )

}

export default Lists