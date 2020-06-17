import React from 'react';
import { Routes } from './services/index';
import './App.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

function App() {
  return (
      <div className="App" style={{ backgroundColor: 'whitesmoke' }}>
        <Routes />
        <Alert stack={{ limit: 1, offset: 100 }} />
      </div >
  );
}

export default App;
