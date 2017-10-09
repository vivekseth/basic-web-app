import React from 'react';
import { Link } from 'react-router-dom'
import AsyncData from '../Util/AsyncData.jsx'
import { Header, Table, List } from 'semantic-ui-react'

const FilmDetailView = (props) => {
  const film = props.data.data;
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
        film.characters.map((char, i) => {
          return (
            <List.Item key={char.character_id}>
              <Link to={'/characters/' + char.character_id}>
                {char.name}
              </Link>
            </List.Item>
          );
        })
      } 
      </List>
    </div>
  )
}

const FilmDetailPage = (props) => {
  const apiURL = '/api/pages/film_detail/' + props.match.params.filmID;
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
