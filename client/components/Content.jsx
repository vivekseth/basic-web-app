import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import HomePage from './Pages/HomePage.jsx'
import FilmsList from './Pages/FilmsList.jsx'
import FilmDetail from './Pages/FilmDetail.jsx'
import CharactersList from './Pages/CharactersList.jsx'
import CharacterDetail from './Pages/CharacterDetail.jsx'
import CredentialsPage from './Pages/CredentialsPage.jsx'

class Content extends React.Component {
  render() {
    return (
      <Container text style={{ marginTop: '7em', minHeight: '500px' }}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/films" component={FilmsList}/>
          <Route path="/films/:filmID" component={FilmDetail}/>
          <Route exact path="/characters" component={CharactersList}/>
          <Route path="/characters/:charID" component={CharacterDetail}/>
          <Route exact path="/login" component={CredentialsPage}/>
        </Switch>
      </Container>
    )
  }
}


export default Content;
