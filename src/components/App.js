import React from 'react';

import Header from './Header'
import Lists from './Lists'
import  AppContext from '../contexts/AppContext'
import { works } from '../data'

function App() {
  return (
    <AppContext.Provider value={ {works} }>
      <div className="App">
        <Header />
        <Lists />
      </div>
    </AppContext.Provider>
  );
}

export default App;
