import React from 'react';
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import AsyncCharacterItem from '../Util/AsyncCharacterItem.jsx'
import AsyncData from '../Util/AsyncData.jsx'
import { Header, Table, List } from 'semantic-ui-react'

const FilmDetailView = (props) => {
  const film = props.data;
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

      <List bulleted>
      {
        film.characters.map((url, i) => {
          const components = url.split('/');
          const characterID = components[components.length - 2];
          return (
            <List.Item key={characterID}>
              <AsyncCharacterItem characterID={characterID} />
            </List.Item>
          );
        })
      } 
      </List>
    </div>
  )
}

const FilmDetailPage = (props) => {
  const apiURL = 'http://localhost:8080/api/films/' + props.match.params.filmID;
  return (
    <AsyncData 
      apiURL={apiURL}
      IsLoading={(props) => {return (<p>Loading...</p>)}}
      NoData={(props) => {return (<p>There is no film with that ID</p>)}}
      HasData={FilmDetailView}
    />
  );
}

export default FilmDetailPage;
