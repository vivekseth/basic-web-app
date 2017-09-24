import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import HomePage from './HomePage.jsx'
import FilmsList from './FilmsList.jsx'
import CharactersList from './CharactersList.jsx'

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/films" component={FilmsList}/>
        <Route path="/characters" component={CharactersList}/>
      </Switch>
    )
  }
}


export default Content;
