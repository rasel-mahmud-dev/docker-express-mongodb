import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AppProvider from "./store/AppContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppProvider>
        <App ></App>
      </AppProvider>
  </React.StrictMode>,
)
