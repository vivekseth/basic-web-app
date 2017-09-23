import React from 'react';
import { render } from 'react-dom'
// import { Router } from 'react-router'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import App from './components/App.jsx'
import Page from './components/Page.jsx'

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/page" component={Page}/>
      </Switch>
    </BrowserRouter>
  )
}

console.log(BrowserRouter);

// <Route path="/page" component={Page}/>

render(routes(), document.getElementById('app'));
