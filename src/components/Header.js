import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Fab,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';


const Header = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flex: 1}}>
          作品一覧管理CMS
        </Typography>
        <Fab color="secondary" aria-label="add" edge="end">
          <AddIcon />
        </Fab>
      </Toolbar>
    </AppBar>
  )
}

export default Header