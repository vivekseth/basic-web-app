import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncCharacterItem from './AsyncCharacterItem.jsx'
import { Header, Table } from 'semantic-ui-react'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      film: null
    }
  }

  _filmID() {
    return this.props.match.params.filmID
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    superagent
      .get('http://localhost:8080/api/films/' + this._filmID())
      .end((err, res) => {
        this.setState({
          isLoading: false,
          film: res.body
        })
      });
  }

  render() {
    const film = this.state.film;

    if (this.state.isLoading) {
      return (<p>loading...</p>);
    }
    else if (!film) {
      return (<p>There is no film with that ID</p>); 
    }
    else {
      return (
        <div>

          <Header as='h1'>
            {film.title}
          </Header>

          <Header as='h2'>
            Information
          </Header>

          <Table basic='very'>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Director</Table.Cell>
                <Table.Cell>{film.director}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Producer</Table.Cell>
                <Table.Cell>{film.producer}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Release Date</Table.Cell>
                <Table.Cell>{film.release_date}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Header as='h2'>
            Opening Crawl
          </Header>

          <p>
            {film.opening_crawl}
          </p>

          <Header as='h2'>
            Characters
          </Header>

          <ul> {
            film.characters.map((url, i) => {
              const components = url.split('/');
              const characterID = components[components.length - 2];
              return (
                <li key={characterID}>
                  <AsyncCharacterItem characterID={characterID} />
                </li>
              );
            })
          } </ul>
        </div>
      )
    }
  }
}

export default FilmDetail;
