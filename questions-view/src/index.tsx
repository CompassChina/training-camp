import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { App } from './App'

const app = document.createElement('div')
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  app
)
document.body.appendChild(app)
