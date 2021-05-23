
import './App.css';

import React from 'react';

import { AppStateProvider } from './Context/AppStateContext';
import CustomRouter from './Router.js/CustomRouter';

function App() {

  return (
    <div className="App">
      <AppStateProvider>
        <CustomRouter />
      </AppStateProvider>
    </div>
  );
}

export default App;
