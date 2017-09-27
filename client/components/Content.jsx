import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import HomePage from './HomePage.jsx'
import FilmsList from './FilmsList.jsx'
import FilmDetail from './FilmDetail.jsx'
import CharactersList from './CharactersList.jsx'
import CharacterDetail from './CharacterDetail.jsx'

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/films" component={FilmsList}/>
        <Route path="/films/:filmID" component={FilmDetail}/>
        <Route exact path="/characters" component={CharactersList}/>
        <Route path="/characters/:charID" component={CharacterDetail}/>
      </Switch>
    )
  }
}


export default Content;
