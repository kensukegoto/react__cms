import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'

import Modal from './Modal'

const Header = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flex: 1}}>
          作品一覧管理CMS
        </Typography>
        <Modal />
      </Toolbar>
    </AppBar>
  )
}

export default Header