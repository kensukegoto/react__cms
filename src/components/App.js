import React from 'react';

import  AppContext from '../contexts/AppContext'
import { works } from '../data'

function App() {
  return (
    <AppContext.Provider value={ {works} }>
      <div className="App">
      </div>
    </AppContext.Provider>
  );
}

export default App;
