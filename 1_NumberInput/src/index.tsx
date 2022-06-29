import React from 'react'
import ReactDOM from 'react-dom'

import { Demo } from './Demo'

const app = document.createElement('div')
ReactDOM.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
  app
)
document.body.appendChild(app)
