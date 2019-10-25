import React from 'react';

import Lists from './Lists'
import  AppContext from '../contexts/AppContext'
import { works } from '../data'

function App() {
  return (
    <AppContext.Provider value={ {works} }>
      <div className="App">
        <Lists />
      </div>
    </AppContext.Provider>
  );
}

export default App;
