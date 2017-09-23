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

/*

Routes: 

/ =>  home page with hero image of starwars
/films =>  list of films (with search)
/films/1 => film data & characters in that film
/characters/ =>  list of characters (with search)
/characters/1 =>  character data & films they are in

Data Mode Relationships: 

Films <-> Characters

Page Layout

Page: 
  navbar: [home, films, characters]
  content: [home-page, films-page, characters-page]
  footer: [static-footer]
*/


console.log(BrowserRouter);

// <Route path="/page" component={Page}/>

render(routes(), document.getElementById('app'));
