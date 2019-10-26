import React,{ useReducer } from 'react';

import Header from './Header'
import Lists from './Lists'
import  AppContext from '../contexts/AppContext'
import data from '../data'
import reducer from '../reducers'

function App() {

  const [works,dispatch] = useReducer(reducer,data.reverse())

  return (
    <AppContext.Provider value={ {works,dispatch} }>
      <div className="App">
        <Header />
        <Lists />
      </div>
    </AppContext.Provider>
  );
}

export default App;
