import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import HomePage from './Pages/HomePage.jsx'
import FilmsListPage from './Pages/FilmsListPage.jsx'
import FilmDetailPage from './Pages/FilmDetailPage.jsx'
import CharactersListPage from './Pages/CharactersListPage.jsx'
import CharacterDetailPage from './Pages/CharacterDetailPage.jsx'
import CredentialsPage from './Pages/CredentialsPage.jsx'

class Content extends React.Component {
  render() {
    return (
      <Container text style={{ marginTop: '7em', minHeight: '500px' }}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/films" component={FilmsListPage}/>
          <Route path="/films/:filmID" component={FilmDetailPage}/>
          <Route exact path="/characters" component={CharactersListPage}/>
          <Route path="/characters/:charID" component={CharacterDetailPage}/>
          <Route exact path="/login" component={CredentialsPage}/>
        </Switch>
      </Container>
    )
  }
}


export default Content;
