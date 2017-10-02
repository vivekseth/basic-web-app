import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import App from './components/App.jsx'

const routes = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

const mountPoint = () => {
  return document.getElementById('app')
}

render(routes(), mountPoint());
