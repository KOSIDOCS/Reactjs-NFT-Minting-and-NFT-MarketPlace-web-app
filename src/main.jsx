import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MarketsProvider } from './context/MarketContext'

ReactDOM.render(
  <MarketsProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </MarketsProvider>,
  document.getElementById('root')
)
