import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.js'
import { RouterProvider } from 'atomic-router-react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider>
    <App />
  </RouterProvider>
)
