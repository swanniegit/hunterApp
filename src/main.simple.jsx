import React from 'react'
import ReactDOM from 'react-dom/client'
import SimpleApp from './App.simple.jsx'
import './index.css'

console.log('🚀 SIMPLE MAIN.JSX LOADING...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>,
)